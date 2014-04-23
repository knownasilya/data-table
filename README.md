data-table
==========

Ember Component for comparing two or more similar datasets.

```hbs
{{data-table datasets=datasets aliases=aliases}}
```

Here's a [demo][1] jsbin.

## Getting Started

Install via Bower, `bower install data-table --save`, then include in your page, and start using.

### Available Attributes

### Required
- datasets - an Array of one or more datasets, each dataset is an Array of objects.

### Optional
- aliases - An object mapping dataset object attribute names to column names, e.g. `{ 'Name': ['name', 'user-name'] }`.

[1]: http://emberjs.jsbin.com/nuroraxe/2/
