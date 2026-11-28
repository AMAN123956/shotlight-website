---
title: How to change where screenshots are saved on Mac
description: Change the folder Mac screenshots save to with Shift Command 5 or one Terminal command, and fix screenshots that do not save at all.
category: name
answer: Press Shift Command 5, click Options, and choose a folder under Save to, or Other Location to pick your own. New screenshots and screen recordings go there from then on. If a screenshot did not save at all, you may have held Control, which copies it to the clipboard instead.
date: 2026-11-28
updated: 2026-11-28
minutes: 5
art: a1
faq:
  - q: Where does a Mac save screenshots by default?
    a: On the Desktop, with names like Screenshot 2026-11-12 at 9.41.07 PM.png.
  - q: Why didn't my screenshot save?
    a: The most common reason is the Control key, which sends the screenshot to the clipboard. The next is a Save to setting of Clipboard, Preview, Mail or Messages. The table in this guide lists the others.
  - q: Can I save screenshots straight to the clipboard?
    a: Yes. Choose Clipboard under Save to, or add Control to any screenshot shortcut for a single capture.
  - q: Does this change where screen recordings go?
    a: Yes. Screenshots and recordings share the same Save to setting.
  - q: Can I change the file type from PNG?
    a: Yes, with one Terminal command, shown near the end of this guide.
---
A Mac saves every screenshot to the Desktop unless you tell it otherwise, and after a few weeks the Desktop disappears under them. You can change the folder in a few clicks. This guide also covers the other half of the question, the screenshot that never shows up anywhere.

| Method | Good for |
|---|---|
| Shift Command 5 › Options | Changing the folder in a few clicks |
| Terminal | Scripts, setting up a new Mac, or older versions of macOS |
| Shotlight setup | Moving captures off the Desktop and filing them by what they show |

## Method 1: Shift Command 5

1. Press <kbd class="key">⇧</kbd> <kbd class="key">⌘</kbd> <kbd class="key">5</kbd>. The screenshot toolbar appears at the bottom of the screen.
2. Click **Options**.
3. Under **Save to**, pick **Desktop**, **Documents**, **Clipboard**, **Mail**, **Messages** or **Preview**. To use your own folder, choose **Other Location** and pick it.
4. Press <kbd class="key">Esc</kbd> to close the toolbar.

A folder called Screenshots inside **Pictures** is a good home. It is out of the way, and Finder can show it in the sidebar if you drag it there.

## Method 2: One Terminal command

This does the same thing and is handy when you set up a new Mac. It makes the folder if it does not exist, sets it, and restarts the part of macOS that takes screenshots:

```
mkdir -p ~/Pictures/Screenshots
defaults write com.apple.screencapture location ~/Pictures/Screenshots
killall SystemUIServer
```

To go back to the Desktop:

```
defaults delete com.apple.screencapture location
killall SystemUIServer
```

## When a screenshot does not save

| What happened | What to do |
|---|---|
| You held <kbd class="key">Control</kbd> with the shortcut | The screenshot went to the clipboard. Open Preview and choose **File**, then **New from Clipboard**, then save it |
| **Save to** is set to Clipboard, Preview, Mail or Messages | Pick a folder in **Options** |
| You dragged the thumbnail into another app or folder | The file went where you dropped it |
| You clicked the thumbnail, then the trash button | Look in the Trash |
| The folder you chose was moved, renamed or deleted | Choose the folder again in **Options** |
| Nothing happens when you press the keys | Open **System Settings**, then **Keyboard**, then **Keyboard Shortcuts**, then **Screenshots**, and check the shortcuts are on |

If your Desktop is in iCloud Drive, screenshots saved there sync to your other Macs. A file that shows a cloud icon is still downloading or was moved to iCloud to save space.

## Change the file type

Screenshots are PNG files. PNG keeps text sharp, and the files can be large. To save JPGs instead:

```
defaults write com.apple.screencapture type jpg
killall SystemUIServer
```

Use `png` in place of `jpg` to switch back. `pdf` and `tiff` also work.

## Method 3: Move them off the Desktop with Shotlight

When you first open [Shotlight](/what-is-shotlight), its setup shows the folder your Mac saves screenshots to. If that is the Desktop, it offers to save new screenshots to **Pictures › Screenshots** instead, and you can switch back in **Settings**. Shotlight then watches that folder and names each new screenshot from what it shows.

Rules can take it further. A rule such as "When text mentions receipt, move to Receipts" files a screenshot the moment it is named, and the rename pill shows where it went, with **Undo**. Shotlight is free while in early access, and the [download page](/download) has the install steps.

## What this does not cover

Changing the folder does not move the screenshots you already have. Select them on the Desktop and drag them to the new folder, or let [Shotlight's search](/guides/find-old-screenshots-mac) find them wherever they are. Screen recordings use the same setting, and the guide to [finding screen recordings](/guides/find-screen-recordings-mac) covers the rest.
