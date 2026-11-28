---
title: How to find old screenshots on Mac
description: Three ways to find an old Mac screenshot. Use Finder with a date, Spotlight for a word in the name, or Shotlight to search the words inside the image.
category: find
answer: Open the folder where your screenshots are saved, usually the Desktop, and sort by Date Created. Finder and Spotlight match names and dates, so they cannot find a screenshot by what it shows. To search the words inside an image, use an app that reads them, like Shotlight.
date: 2026-11-21
updated: 2026-11-28
minutes: 6
art: a1
featured: true
faq:
  - q: Where does my Mac save screenshots?
    a: On the Desktop by default. Press Shift, Command and 5, open Options, and read the Save to line.
  - q: Why can't I find a screenshot I just took?
    a: If you held Control while you took it, the screenshot went to the clipboard and was never saved as a file. Paste it into an app and save it from there.
  - q: Can Spotlight search the text inside a screenshot?
    a: It depends on your macOS version and settings. Search for a word you remember from the image and see what comes back before you rely on it.
  - q: Does Shotlight rename my old screenshots?
    a: Only if you run Tidy Up. Making old screenshots searchable leaves the files and their names as they are.
---
Mac screenshots are named with a date and a time, like `Screenshot 2026-11-12 at 9.41.07 PM.png`. That helps you sort them and does nothing to help you remember what was in one. These three methods get you to the screenshot you need, starting with the ones that need no extra software.

| Method | Finds a screenshot by | Works best when |
|---|---|---|
| Finder | Date and file type | You remember roughly when you took it |
| Spotlight | Words in the file name | The name has a clue, which is rare |
| Shotlight | Words inside the image, the app and the website | You remember what was on the screen |

## Method 1: Finder, when you remember the date

1. Open Finder and go to the folder where your screenshots are saved. On a new Mac that is the **Desktop**.
2. Press <kbd class="key">⌘</kbd> <kbd class="key">F</kbd> to search, click the **+** button, and set **Kind** to **Image**. Finder now shows only pictures.
3. Switch to List view with <kbd class="key">⌘</kbd> <kbd class="key">2</kbd>. If there is no **Date Created** column, right-click the column headings and turn it on.
4. Click **Date Created** to sort, and scroll to the day you took the screenshot.

If the folder is empty, your screenshots may be saved somewhere else. Press <kbd class="key">⇧</kbd> <kbd class="key">⌘</kbd> <kbd class="key">5</kbd>, open **Options**, and read the **Save to** line. The guide to [changing where screenshots are saved](/guides/change-screenshot-location-mac) explains the setting.

Two habits make this faster. Select a file and press <kbd class="key">Space</kbd> to preview it with Quick Look, so you do not have to open each one. In a folder with hundreds of files, choose **View**, then **Group By**, then **Date Created**, and Finder splits the list into days and weeks.

## Method 2: Spotlight, when the name has a clue

Spotlight finds files by name and other details. A screenshot name holds only a date, so searching `Screenshot 2026-11` lists the captures from that month and little else.

Whether Spotlight also finds words inside an image depends on your macOS version and settings. Try it with a word you remember from the screenshot before you rely on it.

## Method 3: Search the words inside, with Shotlight

[Shotlight](/what-is-shotlight) reads the text in each screenshot on your Mac and keeps it in an index, so you can search for what the image shows.

1. Install Shotlight and choose the folder with your screenshots.
2. In setup, choose **Only make searchable**. Shotlight reads the old screenshots in the background and leaves their names alone.
3. Press <kbd class="key">⌥</kbd> <kbd class="key">Space</kbd> and type a word you remember, like `uber receipt`.
4. Press <kbd class="key">Space</kbd> to preview a result, or drag it straight into another app.

Results also match the app a screenshot came from and the website it showed, so `figma onboarding` can find a design you captured last month. Once you have found it, you can [copy the text out of the screenshot](/guides/copy-text-from-screenshot-mac) instead of typing it again. Everything is read on your Mac, and nothing is uploaded. Shotlight is free while it is in early access, and the [download page](/download) has the install steps.

## Keep them from piling up again

Most of the pain comes from everything landing on the Desktop. Press <kbd class="key">⇧</kbd> <kbd class="key">⌘</kbd> <kbd class="key">5</kbd>, open **Options**, and under **Save to** choose a folder such as Pictures, or a new folder called Screenshots. The Desktop stays clear, and every screenshot is in one place you can search.

Shotlight's setup offers to move new screenshots to a Screenshots folder inside Pictures. You can also write a rule, such as "when the text mentions receipt, move it to Receipts", so the screenshots you will want again are filed as they arrive. Names that say what is in each screenshot help as well, and [this guide shows how to rename screenshots on Mac](/guides/rename-screenshots-mac).

## What this does not cover

Shotlight searches the folders you give it. It cannot bring back a screenshot you deleted, and it does not search your Photos library. On macOS 15 the Finder steps are the same. Looking for a video instead? See [where screen recordings go on Mac](/guides/find-screen-recordings-mac).
