### Contents
- [Lets talk](#Lets-talk)
- [Creating pages and categories](#Creating-pages-and-categories)

# Lets talk
If you know what you are doing and want to help, please reach out using our [Official Discord Server](https://discord.gg/Gf4THCqraJ), because this page isnt checked all that often.

# Creating pages and categories
There are currently 2 types of entries in the nav-list: <img align=right src=https://github.com/zvqk/DCtest/assets/97669500/1e4b019a-79ab-4d20-9be3-27c4a344dcfb>

- Category
- Page

Pages are contained in named `.txt` files, and have to be added to `~/scripts/files.json` to be accessed by the preprocessor and the nav-list. You may set different names for the nav-list item and the page.

## Format:
```json
[
      ["Home₁","home₂"]

      ["Dogwater₃",true]
]
```

1. Page name (as appears in nav-list
2. Page file name without file extention
3. Section in nav-list

The page preprocessing, written purely in js, is similar to `Markdown`/`.md` syntax, more evidently inspired by Discord's markup, except most it relies on wrappers or containers (ex: *italics* **bold**) instead of using per-line declaration (like a single `#` for Headings).

It has been made this way to make creating pages less frustrating, as this game updates quite often and there is only one dev to handle all this.

Format:

> Note: FIREYAUTO is the only dev for this game. It is a passion project, and he may not always remain open to pages made by bob or his niece or nephew. We're still greatful for any contributions tho :3
