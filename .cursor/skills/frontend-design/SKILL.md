---
name: frontend-design
description: Build distinctive, production-grade frontend interfaces in Cursor. Prefer shadcn/ui components, Tailwind utilities, and clean reusable patterns. Avoid custom CSS unless clearly necessary.
---

# Frontend Design Skill

## When to use
Use this skill when building or improving:
- pages
- layouts
- dashboards
- landing pages
- forms
- reusable UI components
- design system aligned interfaces
- polishing existing frontend code

Apply this skill especially when the task involves:
- React / Next.js UI
- Tailwind styling
- shadcn/ui components
- responsive layouts
- visual refinement
- improving generic-looking interfaces

---

## Core objective
Create frontend interfaces that feel intentional, polished, production-ready, and visually strong.

The output should:
- solve the actual product need
- have a clear visual direction
- avoid generic AI-looking UI
- stay maintainable and component-oriented
- follow the existing stack and design system
- prefer consistency over random visual creativity

---

## Required design thinking before coding
Before writing code, decide these briefly and reflect them in the implementation:

1. **Purpose**
   - What does this screen/component do?
   - Who is using it?

2. **Visual direction**
   - Choose a clear style direction:
     - minimal
     - editorial
     - premium
     - playful
     - technical
     - dense dashboard
     - soft / calm
     - bold / high-contrast
   - Do not mix too many directions.

3. **Component strategy**
   - Prefer composition of existing components over custom-built primitives.
   - Reuse patterns that scale.

4. **Constraints**
   - Respect framework, responsiveness, accessibility, and performance.
   - Keep code easy to extend.

---

## Stack preferences
When generating UI in this project, follow this order of preference:

1. **Use shadcn/ui components first**
2. **Use Tailwind utility classes for styling**
3. **Use custom CSS only if truly necessary**
4. **Avoid standalone CSS files unless the task specifically requires them**
5. **Avoid inline styles unless there is a strong reason**

### Preferred examples
- Use `Button`, `Card`, `Input`, `Textarea`, `Badge`, `Dialog`, `Sheet`, `Tabs`, `Table`, `DropdownMenu`, `Select`, `Skeleton`, `Separator`, `Avatar` from shadcn/ui where appropriate.
- Build layouts with Tailwind classes.
- Extend visuals with Tailwind tokens, spacing, borders, shadows, radius, grid, flex, and responsive utilities.

### Avoid
- Rebuilding components that already exist in shadcn/ui
- Writing large custom CSS blocks for effects Tailwind can already handle
- Deeply nested messy markup
- Random one-off styling decisions
- Overdesigned UI that harms usability

---

## Styling rules
### 1. shadcn/ui first
Always check whether the UI can be built with shadcn/ui primitives before creating custom structures.

Prefer:
- `Card` for grouped content
- `Button` for CTAs
- `Input` / `Textarea` / `Select` for forms
- `Dialog`, `Drawer`, `Sheet`, `Popover`, `DropdownMenu` for overlays
- `Tabs`, `Accordion`, `Table`, `Badge`, `Alert` for structure and feedback

### 2. Tailwind-first styling
Use Tailwind utilities for:
- spacing
- layout
- typography
- colors
- borders
- shadows
- radius
- responsive behavior
- hover/focus/active states

### 3. Custom CSS only when necessary
Only introduce custom CSS when one of these is true:
- Tailwind utilities are not enough
- a very specific visual effect is essential to the design
- a reusable animation or pattern cannot be expressed cleanly with utilities
- third-party integration requires it

If custom CSS is needed:
- keep it minimal
- isolate it clearly
- explain why it is needed
- do not use it for things Tailwind already solves well

---

## Aesthetic guidelines
### Typography
- Prefer clean, modern, readable typography
- Do not use random flashy fonts by default
- Keep hierarchy obvious
- Use size, weight, spacing, and contrast intentionally

### Color
- Use a cohesive palette
- Prefer project tokens / semantic colors
- Keep contrast accessible
- Use accent colors intentionally, not everywhere

### Spacing and layout
- Prefer strong spacing rhythm
- Use whitespace deliberately
- Align consistently
- Build clear visual hierarchy
- On dense screens, use grouping and separation carefully

### Visual quality
- Aim for refined, product-grade polish
- Use shadows, borders, muted backgrounds, and radius with restraint
- Prefer subtle sophistication over noisy decoration
- Distinctive does not mean chaotic

### Motion
- Keep motion purposeful
- Prefer subtle transitions
- Avoid excessive animation unless the task explicitly calls for a highly expressive UI

---

## UX and product quality rules
Always ensure:
- responsive design
- keyboard accessibility
- semantic HTML
- clear empty states
- clear loading states
- clear error states
- readable forms
- obvious CTA hierarchy
- good mobile behavior
- reusable component structure

---

## Anti-patterns
Never default to:
- generic “AI SaaS” hero sections without context
- purple gradient + white background + glassmorphism unless explicitly suitable
- unnecessary custom CSS
- large monolithic components
- arbitrary spacing values everywhere
- inconsistent button styles
- too many card variants in the same screen
- poor contrast
- decorative clutter without product value

---

## Implementation rules
When writing code:
- keep components modular
- extract repeated UI patterns
- use meaningful component names
- keep markup readable
- prefer semantic structure
- prefer maintainable Tailwind class grouping
- avoid premature abstraction, but extract repeated patterns
- if using Next.js, respect server/client component boundaries

---

## Cursor-specific behavior
When this skill is active:
- generate UI using shadcn/ui by default
- use Tailwind before considering custom CSS
- only add custom CSS when required
- produce code that is directly usable in a real project
- optimize for clean structure, maintainability, and visual polish
- do not generate “fancy” UI at the cost of usability

---

## Output expectations
A good result should usually include:
- a clear component structure
- shadcn/ui usage where relevant
- Tailwind-based styling
- responsive behavior
- polished states
- accessible markup
- minimal need for follow-up cleanup

---

## Example instruction interpretations

### Example 1
User asks:
“Build a settings page”

Expected behavior:
- use `Card`, `Switch`, `Input`, `Button`, `Tabs`, `Separator`
- structure settings into logical groups
- use Tailwind for layout and spacing
- avoid custom CSS unless a very specific effect is required

### Example 2
User asks:
“Make this hero section more premium”

Expected behavior:
- improve hierarchy, spacing, CTA structure, and visual balance
- prefer existing design system components
- use Tailwind utilities
- avoid random gradients and unnecessary effects
- only add custom CSS if the premium look truly depends on it

### Example 3
User asks:
“Create a data table dashboard”

Expected behavior:
- use shadcn/ui table-related primitives where possible
- use cards, badges, filters, tabs, dropdowns
- keep information dense but readable
- prioritize spacing, grouping, and responsive behavior