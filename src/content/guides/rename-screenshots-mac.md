---
title: How to rename screenshots on Mac
description: Rename a Mac screenshot by hand, change the start of every new name with one Terminal command, or let an app name each one from what is in it.
category: name
answer: Select a screenshot in Finder, press Return, and type a new name. To change how every future name starts, set a prefix with one Terminal command. To get a useful name without typing, use an app that reads the image, like Shotlight, which names each screenshot as you take it.
date: 2026-11-21
updated: 2026-11-28
minutes: 6
art: a2
faq:
  - q: Can I change the default name Mac gives to screenshots?
    a: You can change the start of the name with the Terminal command in this guide. The date and time that follow stay.
  - q: Will renaming a screenshot break anything?
    a: A document that points to the file by its name can lose the link when you rename it. Rename screenshots before you use them, or insert the image again afterward.
  - q: Does Shotlight keep the original name?
    a: Yes. It stores the old name with the file, and you can undo a rename from the pill or restore the original from the Library.
---
A new screenshot is called something like `Screenshot 2026-11-12 at 9.41.07 PM.png`. When you have a few hundred of them, none of those names tells you which one holds the invoice. Here are three ways to fix that, from a quick manual rename to names that write themselves.

| Method | You get | Effort |
|---|---|---|
| Rename by hand | Any name you like, one file at a time | A few seconds per file |
| Terminal prefix | A fixed word at the start of every new name | One command, once |
| Shotlight | A name from what is in each screenshot | None after setup |

## Method 1: Rename by hand in Finder

1. Click the screenshot in Finder.
2. Press <kbd class="key">Return</kbd>, type the new name, and press <kbd class="key">Return</kbd> again.

To rename several at once, select them, right-click, and choose **Rename**. Finder can replace text in the names, add text before or after them, or give each file a name plus a number, such as `Invoice 1`, `Invoice 2`.

This works well for a handful of files. It stops being fun at fifty.

## Method 2: Change the start of every new name

macOS lets you replace the word `Screenshot` at the start of each new file name with a word of your choice. Paste this into Terminal:

```
defaults write com.apple.screencapture name "Capture"
killall SystemUIServer
```

New screenshots are now called `Capture 2026-11-12 at 9.41.07 PM.png`. To go back to the default, run:

```
defaults delete com.apple.screencapture name
killall SystemUIServer
```

This changes only the first word. The name cannot describe the screenshot, because macOS does not know what is in it.

## Method 3: Name each screenshot from what it shows, with Shotlight

[Shotlight](/what-is-shotlight) reads each new screenshot on your Mac and renames it the moment you take it. A small pill appears for a couple of seconds with the new name, an **Edit** button and an **Undo** button.

A screenshot of an invoice might become `Stripe invoice March 2026.png`. On macOS 26 with Apple Intelligence turned on, the name comes from Apple's on-device model. Without it, Shotlight builds the name from the text it finds in the image.

What you can do with it:

1. Press **Edit** on the pill to change a name, or **Undo** to bring back the original.
2. Run **Tidy Up** to rename the screenshots you already have. You see every proposed name first, can uncheck the ones you want to keep, and can undo the whole batch with one key.
3. Open **Settings**, then **Naming**, to add the app or the date, choose short or detailed names, and change the separator or the letter case. A live preview shows each change.

Shotlight never puts passwords, API keys or card numbers into a name. Nothing is uploaded, and it keeps the original name stored with the file. It is free while in early access, and the [download page](/download) has the install steps.

## What makes a good screenshot name

If you name files yourself, a few rules keep the names useful a year later:

- Say what the screenshot shows, not that it is a screenshot. `Router settings page` beats `Screenshot 14`.
- Put the app or website first when you will have many from the same place, such as `Figma onboarding flow`.
- Add a date only when order matters. Finder already sorts by date, so the date in the name is often noise.
- Keep it short enough to read in a narrow window, and leave out anything private. A name is visible in every list, preview and share sheet.

A name only does so much. When you need to [find an old screenshot](/guides/find-old-screenshots-mac), the words inside the image are a better handle than the file name, and once you have found it you can [copy that text](/guides/copy-text-from-screenshot-mac) instead of retyping it.

## What this does not cover

Shotlight names screenshots and screen recordings. It does not rename other kinds of files. If a document already points to a screenshot by its file name, renaming the file can break that link in some apps. For folders, tags and clearing out the ones you no longer need, see [how to organize screenshots on Mac](/guides/organize-screenshots-mac).
