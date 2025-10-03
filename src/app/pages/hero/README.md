# Hero Component

A modern, vibrant hero component inspired by cryptocurrency landing pages, built using the design system foundations.

## Features

- **Responsive Design**: Adapts to different screen sizes
- **Customizable Content**: All text and links can be customized via inputs
- **Design System Integration**: Uses tokens from `__index.scss` for consistent styling
- **Interactive Elements**: Copy contract address functionality
- **Animated Elements**: Scrolling text animation in footer
- **Social Media Integration**: Configurable social media links

## Usage

### Basic Usage

```html
<app-hero></app-hero>
```

### Customized Usage

```html
<app-hero
  [title]="'DOGGER PRO'"
  [subtitle]="'Premium Dog Experience'"
  [contractAddress]="'0x1234...5678'"
  [description]="'WE LOVE DOGS! WE PROTECT DOGS!'"
  [socialLinks]="customSocialLinks"
  [primaryAction]="{text: 'GET STARTED', url: '#'}"
  [secondaryAction]="{text: 'VIEW FEATURES', url: '#'}">
</app-hero>
```

## Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | `string` | `'DOGGER'` | Main hero title |
| `subtitle` | `string` | `'The Ultimate Dog Companion'` | Subtitle text |
| `contractAddress` | `string` | `'0x...32'` | Contract address to display |
| `description` | `string` | `'WE LOVE DOGS! WE PROTECT DOGS!'` | Footer description text |
| `socialLinks` | `Array<{name: string, icon: string, url: string}>` | Default social links | Array of social media links |
| `primaryAction` | `{text: string, url: string}` | `{text: 'BUY NOW', url: '#'}` | Primary CTA button |
| `secondaryAction` | `{text: string, url: string}` | `{text: 'LEARN MORE', url: '#'}` | Secondary CTA button |

## Design System Integration

The component uses the following design system tokens:

### Colors
- `--color-blue-500`: Main background
- `--color-white`: Header and contract bar backgrounds
- `--color-green-500`: Primary buttons and logo
- `--color-orange-500`: Secondary buttons and active dots
- `--color-purple-500`: Copy button border
- `--color-black`: Footer background

### Spacing
- Uses spacing tokens (`--space-1` to `--space-8`) for consistent spacing
- Responsive spacing with clamp() for typography

### Typography
- Font size tokens (`--font-high-*` and `--font-low-*`)
- Font weight tokens (`--font-weight-*`)

### Border Radius
- Uses radius tokens (`--radius-*`) for consistent rounded corners

### Shadows
- Uses shadow tokens (`--shadow-*`) for depth and elevation

## Styling Classes

The component uses BEM methodology for CSS classes:

- `.hero`: Main container
- `.hero__header`: Header section
- `.hero__logo`: Logo area
- `.hero__nav`: Navigation links
- `.hero__main`: Main content area
- `.hero__title`: Main title
- `.hero__contract-bar`: Contract address bar
- `.hero__social`: Social media links
- `.hero__mascot`: Mascot/illustration area
- `.hero__footer`: Footer section

## Responsive Behavior

- **Desktop**: Full layout with mascot on the right
- **Tablet**: Stacked layout with centered content
- **Mobile**: Vertical layout with simplified navigation

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- CSS Custom Properties (CSS Variables) support required

## Examples

See `hero-demo.component.ts` for complete usage examples.

## Customization

To customize the component further:

1. **Colors**: Modify the CSS custom properties in the component's SCSS file
2. **Layout**: Adjust the flexbox and grid properties
3. **Animations**: Modify the keyframe animations for different effects
4. **Typography**: Update font families and sizes using design system tokens

## Dependencies

- Angular Common Module
- Design System Foundations (`__index.scss`)
- No external dependencies required
