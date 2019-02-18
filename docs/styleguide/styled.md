# Styled componetns

Follow best practices and read the [documentation](https://www.styled-components.com/docs)!

## Primitives

A **primitive** is a styled component that consists only of a single styled component and has no wrapper:

```js
// @flow strict
import styled from "styled-components";

const Input = styled.input`
    color: black;
`;

export default Input;
```

### Default theme

Every component that uses theme **must** have a `defaultProps` with the `theme` property set:

```js
// @flow strict
import styled from "styled-components";

import { themeDefault } from "client/records/Theme";

const Input = styled.input`
    background: ${props => props.theme.colors.primary};
`;

Input.defaultProps = {
    theme: themeDefault,
};

export default Input;
```

This is to allow easy testing without having to provide `theme` every time.

### Nesting

Usually the only valid use case for nesting is when having to style a dynamically injected component class:

```js
// @flow strict
import * as React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    background: white;

    .icon {
        height: 20px;
        width: 20px;
    }
`;

type Props = {|
    Icon: React.ComponentClass<any>,
|};

const MyComponent = ({ Icon }: Props) => (
    <Wrapper>
        <Icon className="icon" />
    </Wrapper>
);

export default MyComponent;
```

Or having to style already styled 3rd party things, such as Google autocompleter.

Nest, just don't abuse!

### Types

Use `React.ComponentType<Props>`. This disables class methods, though. If that's a problem, just `// $FlowExpected: Bad typings`.

```js
// @flow strict
import * as React from "react";
import styled from "styled-components";

type Props = {|
  background: "black" | "white";
|};

const Input: React.ComponentType<Props> = styled.input`
    background: ${(props: Props) => props.background};
`;

export default Input;
```

## Components

A **component** is a regular React component that consists of more than a single styled component:

```js
// @flow strict
import styled from "styled-components";

const Label = styled.input`
    height: 40px;
`;

const Input = styled.input`
    color: black;
`;

type Props = {
    id: string,
    value: string,
};

const InputText = (props: Props) => (
    <Label htmlFor={props.id}>
        <Input {...props} />
    </Label>
);

export default InputText;
```
