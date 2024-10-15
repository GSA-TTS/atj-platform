import { test, expect } from 'vitest';

test('Button renders correctly and responds to click', async () => {
  // Create a simple DOM structure for testing
  document.body.innerHTML = `
    <button id="my-button">Click me!</button>
  `;

  // Find the button element
  const button = document.getElementById('my-button');

  // Ensure the button is found
  expect(button).not.toBeNull();
  expect(button?.textContent).toBe('Click me!');

  // Simulate a click event and assert behavior
  let clicked = false;
  button?.addEventListener('click', () => {
    clicked = true;
  });

  // Trigger the click event
  button?.click();

  // Check if the button was clicked
  expect(clicked).toBe(true);
});
