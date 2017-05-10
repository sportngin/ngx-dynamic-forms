# Dynamic Forms

Dynamic Forms allow data collection forms to be easily constructed from reusable components without requiring lots of developer work.

Setting up a form requires several components:

* A model class, derived from `Model`. This is where the fields and layout of the form will be defined.
* A form host component: This is your component that will host the form itself, and work with the data collected by the form. It must implement `FormComponentHost`.
* A view template, which includes the `dynamic-form` component, and any other layout and other functionality not handled by dynamic forms.
* Optionally, a view model class, whose properties correspond to the fields defined in the model.

## Setting Up the Model
The model defines how the layout and fields of the dynamic form are constructed.