// ----------------------------------------------------------------------
// HOW TO MOCK JSON RESPONSE ?
// we need to use mock service worker - setup hanlders and server as below:
// npm i --dev msw
// ----------------------------------------------------------------------

// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
    rest.get('http://localhost:8080/api/v1/posts', (req, res, ctx) => {
        return res(
            ctx.delay(1500),
            ctx.status(200, 'Mocked status'),
            ctx.json([
                { title: 'My first post', description: 'its a nice book' },
                { title: 'My second post', description: 'its best selling book' },
            ])
        );
    }),
    rest.post('http://localhost:8080/api/v2/order', (req, res, ctx) => {
        return res(ctx.json({ orderNumber: 123455676 }));
    }),
];

// ----------------------------------------------------------------------
// configuring server by passing above created handlers
// ----------------------------------------------------------------------

// src/mocks/server.js
import { setupServer } from 'msw/node';
import { handlers } from './handlers';
// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);

// ----------------------------------------------------------------------
// configuring our tests to use mock server instead of making request to actual server.
// ----------------------------------------------------------------------
// src/setUpTests.js
import { server } from './mocks/server.js';
// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

// ----------------------------------------------------------------------
// configuring our own render function with wrapping (custom render)
// The wrapper can be any hoc / context provider which is used to wrap actual component
// ----------------------------------------------------------------------
// src/test-utils/testing-library-utils.js
import { render } from '@testing-library/react';
import { OrderDetailsProvider } from '../contexts/OrderDetails';

const renderWithContext = (ui, options) =>
    render(ui, { wrapper: OrderDetailsProvider, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWithContext as render };


// ----------------------------------------------------------------------
// If we want to override server's response to assert error responses from server:
// ----------------------------------------------------------------------

import { render, screen } from 'src/test-utils/testing-library-utils';
test('error response from server for submitting order', async () => {
    // override default msw response for options endpoint with error response
    server.resetHandlers(
        rest.post('http://localhost:8080/order', (req, res, ctx) =>
            res(ctx.status(500))
        )
    );
    render(<OrderConfirmation />);
    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('An unexpected error occurred.');
});


// ----------------------------------------------------------------------
// ASYNCHRONOUS TESTS - option 1
// ----------------------------------------------------------------------

test('displays image for each scoop option from server', async () => {
    render(<Options optionType="scoops" />);

    // find images
    // using 'await' here because, Option component will make http call in its useEffect
    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    // confirm alt text of images
    const altText = scoopImages.map((element) => element.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});


// ----------------------------------------------------------------------
// ASYNCHRONOUS TESTS - option 2
// ----------------------------------------------------------------------


describe('Async component', () => {
    test('renders posts if request succeeds', async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => [{ id: 'p1', title: 'First post' }],
        });
        render(<Async />);

        const listItemElements = await screen.findAllByRole('listitem');
        expect(listItemElements).not.toHaveLength(0);
    });
});

// ----------------------------------------------------------------------
// OVERRIDING MULTIPLE SERVER CALLS, WAITs & MOCKING FUNCTIONS
// refer: https://jestjs.io/docs/mock-functions
// ----------------------------------------------------------------------

test('handles error for scoops and toppings routes', async () => {
    server.resetHandlers(
        rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
            res(ctx.status(500))
        ),
        rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
            res(ctx.status(500))
        )
    );

    render(<OrderEntry setOrderPhase={jest.fn()} />);

    // wait for multiple expectations
    await waitFor(async () => {
        const alerts = await screen.findAllByRole('alert');
        expect(alerts).toHaveLength(2);
    });

    await waitForElementToBeRemoved(() =>
        screen.queryByText(/no ice cream will actually be delivered/i)
    );
});