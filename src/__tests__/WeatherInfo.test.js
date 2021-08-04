import { render, screen, fireEvent } from '@testing-library/react';
import WeatherInfo from '../components/WeatherInfo.js';

test('check app title',()=>{
  render(<WeatherInfo/>);
  const element = screen.getByText("Weather App");
  expect(element).toBeInTheDocument();
});

test('check radio buttons',()=>{
  const {getByLabelText} = render(<WeatherInfo/>);
  const radio1 = getByLabelText('Celcius')
  fireEvent.change(radio1, { target: { value: "metric" } });
  expect(radio1.value).toBe('metric');

  const radio2 = getByLabelText('Fahrenheit')
  fireEvent.change(radio2, { target: { value: "imperial" } });
  expect(radio2.value).toBe('imperial');
})