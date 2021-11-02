---
title: Using currying to handle event handlers in React
date: 2021-08-02
tags: [functional-programming,react,currying]
---

Suppose we have parent and child component and parent has handler which gets activated when child component's onChange event is called.

The Note component(parent) has to process onChange event from Checkbox component(grandchile) and another onChange event from Ingredient(child).

![IngredientsComponent](../../static/media/210802/ingredients.gif)

Parent 

```jsx

import React, { useState } from 'react';
import { Ingredient, Tags } from '../molecules';
// ...

export default function Note(): JSX.Element {
const [ingredientsList, setIngredientsList] = useState([
    { id: 1, isChecked: false, name: '1tsp of salt', focused: false },
    { id: 2, isChecked: true, name: '2 carrots', focused: false },
  ]);

// ...

const handleValueChange = (idx: number, e: ChangeEvent<HTMLInputElement>) => 
	{
    const copiedIngredientsList = [...ingredientsList];
    copiedIngredientsList[idx].name = e.target.value;
    setIngredientsList(copiedIngredientsList);
  };

const handleCheckboxChange = (idx: number, e: ChangeEvent<HTMLInputElement>) => 
{
const copiedIngredientsList = [...ingredientsList];
copiedIngredientsList[idx].isChecked = e.target.checked;
setIngredientsList(copiedIngredientsList);
}

return (
	<div>
	  <div>
	    <span>Ingredients</span>
	  </div>
	  {ingredientsList.map((ingredient, index) => (
        <Ingredient
          key={ingredient.id}
          checked={ingredient.isChecked}
          value={ingredient.name}
          onListChange={handleIngredientsList}
          onValueChange={handleValueChange}
          onCheckboxChange={handleCheckboxChange}
          idx={index}
        />
      ))}
	</div>
)
```



Child

```jsx
// ...
interface Props {
  checked: boolean;
  onValueChange: (id: number, e: ChangeEvent<HTMLInputElement>) => void;
  onCheckboxChange: (id: number, e: ChangeEvent<HTMLInputElement>) => void;
  onListChange: (id: number, e: KeyboardEvent<HTMLInputElement>) => void;
  value: string;
  idx: number;
}

export default function Ingredient({
  isFocused,
  checked,
  onEnter,
  onValueChange,
	onCheckboxChange,
  value,
  id,
}: Props) {
  return (
    <div>
      <label htmlFor="ingredient">
        <Checkbox
          id={id}
          checked={checked}
          onCheckboxChange={onCheckboxChange}
          name={`checkbox_${id}`}
          color="primary"
        />
      </label>
      <input
        autoFocus={isFocused}
        id={value}
        type="text"
        value={value}
        onKeyDown={onEnter}
        onChange={(e) => onValueChange(id, e)}
      />
    </div>
  );
}
```



Grandchild

```jsx
// ...

interface Props {
  id: number;
  checked: boolean;
  onCheckboxChange: (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  name: string;
  color: 'primary' | 'secondary';
}

export default function Checkbox({
  id,
  checked,
  onCheckboxChange,
  name,
  color,
}: Props) {
  return (
    <CustomCheckbox
      checked={checked}
      onChange={(e) => onCheckboxChange(id, e)}
      name={name}
      color={color}
    />
  );
}
```

Like we see on parent component, two event handlers(handleValueChange, handleCheckboxChange) are called each on CustomCheckbox components' onChange event and on input elements' onChange event. 

But two event handlers contain very similar logic as below.

```jsx
const handleValueChange = (idx: number, e: ChangeEvent<HTMLInputElement>) => 
	{
    const copiedIngredientsList = [...ingredientsList];
    copiedIngredientsList[idx].name = e.target.value;
    setIngredientsList(copiedIngredientsList);
  };

const handleCheckboxChange = (idx: number, e: ChangeEvent<HTMLInputElement>) => 
	{
		const copiedIngredientsList = [...ingredientsList];
		copiedIngredientsList[idx].isChecked = e.target.checked;
		setIngredientsList(copiedIngredientsList);
	}

```

By using currying, these two handlers logic can be reduced to one handler.

```jsx
const handleValueChange =
  (type: string) => (idx: number, e: ChangeEvent<HTMLInputElement>) => {
    const copiedIngredientsList = [...ingredientsList];

    switch (type) {
      case 'text':
        copiedIngredientsList[idx].name = e.target.value;
        break;
      case 'checkbox':
        copiedIngredientsList[idx].isChecked = e.target.checked;
        break;
      default:
        break;
    }

    setIngredientsList(copiedIngredientsList);
  };

// ...

<div css={commonInputStyle}>
  <div css={commonTitleStyle}>
    <span>Ingredients</span>
  </div>
  {ingredientsList.map((ingredient, index) => (
    <Ingredient
      key={ingredient.id}
      checked={ingredient.isChecked}
      value={ingredient.name}
      onListChange={handleIngredientsList}
      onValueChange={handleValueChange('text')}
      onCheckboxChange={handleValueChange('checkbox')}
      idx={index}
    />
  ))}
```

Child and grandchild component stay the same as before. Although we have added one argument ('text' and 'checkbox'), the handler props passed towards children has same structure `(id: number, e: React.ChangeEvent<HTMLInputElement>) => void;`  Currying method enables us to condense duplicated functions into a function while not interrupting children's handler prop arguments.