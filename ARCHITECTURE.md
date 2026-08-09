# PascalX frontend structure

The app uses a feature-based structure while keeping the existing visual system in `app/globals.css`.

```text
app/                         Next.js routes and global styles
components/ui/               Reusable visual primitives
features/courses/            Course domain data and future course flows
features/faq/                FAQ domain data and future FAQ interactions
public/media/                Video and image assets
```

New course or FAQ behaviour should live in its feature folder. Shared presentation primitives belong in `components/ui`; route composition stays in `app`.

Tailwind CSS v4 is loaded from `app/globals.css`. Existing class names and CSS rules remain the source of truth for the current design, with utilities introduced incrementally to avoid visual regressions.
