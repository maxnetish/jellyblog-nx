import React from 'react';
import AppInput, { AppInputProps } from './app-input';
import { Meta, Story } from '@storybook/react';
import App from '../../../../../apps/admin-ui/src/app/app';
import { text, withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Form components/Input',
  // decorators: [withKnobs],
  component: AppInput
} as Meta;

const Template: Story<AppInputProps> = (args) => <AppInput {...args} />;

export const WithAllProps = Template.bind({});

WithAllProps.args = {
  value: 'value from args',
}
