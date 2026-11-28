---
title: How to find duplicate screenshots on Mac
description: Find exact copies and near-identical retakes of your Mac screenshots with Photos, Finder, one Terminal command, or Shotlight's Duplicates view.
category: name
answer: If your screenshots are in the Photos app, open Photos and click Duplicates under Utilities in the sidebar. For screenshots saved as files on the Desktop or in folders, macOS has no duplicate finder. Sort by size in Finder, run one Terminal command for exact copies, or use an app like Shotlight that also catches retakes.
date: 2026-11-28
updated: 2026-11-28
minutes: 5
art: a5
faq:
  - q: Why doesn't Photos find my duplicate screenshots?
    a: Photos only checks pictures in its own library. Screenshots saved to the Desktop or a folder are plain files, and Photos never sees them unless you import them.
  - q: What is a retake?
    a: The same screen captured again a few seconds later, because the first try caught the pointer or a page that was still loading. The files differ slightly, so tools that look for identical files miss them.
  - q: Which copy does Shotlight keep?
    a: The oldest of a set of exact copies, and the latest of a set of retakes, since the last take is usually the one you meant. Press K on another one to keep that instead.
  - q: Can I undo it?
    a: Yes. The extra copies go to the Trash, and ⌘Z in the Library brings them back.
---
Duplicate screenshots come in two kinds. Exact copies are the same file twice, from dragging a screenshot into another folder or saving it again from a chat. Retakes are the same screen captured three or four times in a row because the first one caught the pointer or a menu that was still open. Exact copies are easy to find. Retakes are not identical, so most duplicate finders skip them.

| Method | Finds | Looks in |
|---|---|---|
| Photos › Duplicates | Exact copies and close matches | Your Photos library only |
| Finder | Copies you spot by size and time | Any folder |
| Terminal | Exact copies | Any folder |
| Shotlight | Exact copies and retakes | The folders you choose |

## Method 1: Photos, for screenshots in your library

1. Open **Photos**.
2. In the sidebar, under **Utilities**, click **Duplicates**. The album only appears when Photos has found some.
3. Look through each set, then click **Merge** to keep one picture and move the others to **Recently Deleted**.

Merged items stay in every album the copies were in. Look at each set before you merge, because Photos also groups pictures that are close but not the same.

This does nothing for screenshots on your Desktop. Those are files, and Photos only sees what you import.

## Method 2: Finder, by size and time

1. Open the folder with your screenshots and press <kbd class="key">⌘</kbd> <kbd class="key">2</kbd> for List view.
2. Click the **Size** column to sort by size. If there is no **Size** column, right-click the column headings and turn it on.
3. Files with the same size and a close time are likely copies. Select one and press <kbd class="key">Space</kbd> to preview it, then use the arrow keys to compare it with its neighbours.

Copies made in Finder usually end in `copy` or a number, like `Screenshot 2026-11-12 at 9.41.07 PM copy.png`, so sorting by **Name** helps too.

## Method 3: List exact copies with one Terminal command

This command reads every screenshot in a folder and lists each file whose contents match one listed before it. It changes nothing.

```
cd ~/Desktop
shasum Screenshot*.png | awk 'seen[$1]++'
```

Each line it prints is a spare copy, and the first file of each set is left off the list, so you can move every listed file to the Trash and still keep one of each. If you have renamed your screenshots, change `Screenshot*.png` to `*.png`.

This only finds files that are identical to the byte. Two captures of the same screen, taken a second apart, are different files.

## Method 4: Find copies and retakes, with Shotlight

[Shotlight](/what-is-shotlight) reads your screenshots on your Mac to name them and make them searchable. Its Library window has a **Duplicates** section that finds both kinds.

- Exact copies are files with the same bytes.
- Retakes are screenshots that look nearly the same, show nearly the same words, and were taken within 10 minutes of each other.

Each set is shown together, with a line such as "4 takes of the same thing · 15 s apart". One screenshot in each set is marked **Keep**: the oldest of exact copies, and the latest of retakes.

1. Open the Library and click **Duplicates** under **Guard**.
2. To keep a different screenshot from a set, select it and press <kbd class="key">K</kbd>.
3. Press <kbd class="key">⌘</kbd> <kbd class="key">Return</kbd> to keep the marked ones and move the rest to the Trash.
4. Changed your mind? Press <kbd class="key">⌘</kbd> <kbd class="key">Z</kbd>.

If you are renaming a backlog of old screenshots with **Tidy Up**, it can also move exact copies to the Trash as part of the same run. That option is off until you turn it on. Shotlight is free while in early access, and the [download page](/download) has the install steps.

## What this does not cover

Shotlight checks the folders you give it, not your Photos library. Two screenshots of the same page taken an hour apart are not treated as retakes, because you may have taken the second one on purpose. If duplicates are only part of the mess, the guide to [deleting old screenshots automatically](/guides/delete-old-screenshots-mac) covers the rest.
