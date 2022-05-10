import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

describe('Homepage test cases', () => {
  it('should render home page', async () => {
    render(<App />);

    expect(screen.getByText('React Tabs Demo')).toBeInTheDocument();
  });

  it('should render Tab Component and initial tab content', async () => {
    render(<App />);

    expect(screen.getByText('Tabs - Controlled Component')).toBeInTheDocument();

    const firstButton = screen.getAllByRole('listitem')[0]
    expect(firstButton.classList.contains('active')).toBeTruthy()

    expect((await screen.findAllByText('This is Tab 1')).length).toEqual(3)
  });

  it('should change tab & content', async () => {
    render(<App />);

    // asserting that initially Tab C is rendering twice i.e. for both Tab2 components
    // which are hidden
    expect((await screen.findAllByText('This is Tab 3')).length).toEqual(2)

    fireEvent.click(screen.getAllByText('C')[0]) // triggering for the 1st component's C tab.

    // after triggering click, verifying that it is now rendering thrice
    expect((await screen.findAllByText('This is Tab 3')).length).toEqual(3)
  });
})