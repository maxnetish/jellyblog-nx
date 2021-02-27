import React from 'react';
import { render } from '@testing-library/react';

import AppInput from './app-input';

describe('UiSharedForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppInput />);
    expect(baseElement).toBeTruthy();
  });
});
