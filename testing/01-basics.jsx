import { render, 
    screen, 
    fireEvent, 
    userEvent, 
    waitFor,
    waitForElementToBeRemoved } 
from '@testing-library/react';

// single test
test("test description", () => { })

// multiple tests
descript("test suite description", () => {
    test("test description - 1", () => { })
    test("test description - 2", () => { })
    test("test description - 3", () => { })
})


test("test description", () => {

    // rendering the components
    render(<App />);

    // identifying the elements
    // available roles: https://www.w3.org/TR/html-aria/#docconformance
    const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' });
    const checkbox = screen.getByRole('checkbox');
    const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });

    // firing events:
    fireEvent.click(colorButton);
    
    // use events
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '-1');
    userEvent.hover(termsAndConditions);

    // assertions:
    // use toBe for checking primitives
    // use toEqual for reference types (arrays, objects), toEqual does a deep comparison 
    expect(colorButton).toBeEnabled();
    expect(colorButton).toBeDisabled();
    expect(checkbox).not.toBeChecked();
    expect(images).toHaveLength(3);
    expect(scoopsSubtotal).toBeInTheDocument();
    expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' });
    expect(colorButton).toHaveTextContent('Change to Medium Violet Red');

    // reference types
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
    expect(imageTitles).toEqual([
        'Cherries topping',
        'M&Ms topping',
        'Hot fudge topping',
    ]);
})


// testing utility functions:
export function replaceCamelWithSpaces(colorName) {
    return colorName.replace(/\B([A-Z])\B/g, ' $1');
}
test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
});