/* eslint-disable */
import React from 'react';
import { Form, Message } from 'semantic-ui-react';
import { size } from 'lodash';

const config = require('config').default;

export function GenerateField(field) {
  switch (field.type) {
    case 'checkbox':
      return (
        <Form.Field>
          <Form.Checkbox
            label={field.label}
            checked={field.input.checked}
            onChange={() => field.input.onChange(!field.input.checked)}
          />
          {
            field.meta.touched && field.meta.error ?
              (<Message negative>
                <p>{field.meta.error}</p>
              </Message>)
              : ''
          }
        </Form.Field>
      );
    case 'toggle':
      return (
        <Form.Field>
          <Form.Checkbox
            toggle
            label={field.label}
            checked={field.input.checked}
            onChange={() => field.input.onChange(!field.input.checked)}
          />
          {
            field.meta.touched && field.meta.error ?
              (<Message negative>
                <p>{field.meta.error}</p>
              </Message>)
              : ''
          }
        </Form.Field>
      );
    case 'select':
      return (
        <div>
          <Form.Select
            value={field.input.value}
            search
            label={field.label}
            options={field.options}
            onChange={field.onChange ? field.onChange : (e, data) => field.input.onChange(data.value)}
            required={field.required}
          />
          {
            field.meta.touched && field.meta.error ?
              (<Message negative>
                <p>{field.meta.error}</p>
              </Message>)
              : ''
          }
        </div>
      );
    case 'typeahead':
      return (
        <div>
          <Form.Select
            search
            label={field.label}
            options={field.options}
            onChange={(e, data) => field.onChange(data.value)}
            required={field.required}
          />
          {
            field.meta.touched && field.meta.error ?
              (<Message negative>
                <p>{field.meta.error}</p>
              </Message>)
              : ''
          }
        </div>
      );
    case 'textarea':
      return (
        <Form.Field>
          <Form.TextArea
            {...field.input}
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            disabled={field.disabled}
          />
          {
            field.meta.touched && field.meta.error ?
              (<Message negative>
                <p>{field.meta.error}</p>
              </Message>)
              : ''
          }
        </Form.Field>
      );
    case 'password':
      return (
        <Form.Field>
          <Form.Input
            {...field.input}
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            disabled={field.disabled}
            type="password"
          />
          {
            field.meta.touched && field.meta.error ?
              (<Message negative>
                <p>{field.meta.error}</p>
              </Message>)
              : ''
          }
        </Form.Field>
      );
      default:
      return (
        <Form.Field>
          <Form.Input
            {...field.input}
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            disabled={field.disabled}
            fluid={field.fluid}
            icon={field.icon}
            iconPosition={field.iconPosition}
            action={field.action}
            autoComplete={field.autocomplete}
          >
            {field.children}
          </Form.Input>
          {
            field.meta.touched && field.meta.error ?
              (<Message negative>
                <p>{field.meta.error}</p>
              </Message>)
              : ''
          }
        </Form.Field>
      );
  }
}
