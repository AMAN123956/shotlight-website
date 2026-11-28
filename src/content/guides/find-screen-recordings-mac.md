---
title: Where do screen recordings go on Mac? How to find them
description: Mac screen recordings save to the Desktop unless you picked another folder. How to find one, why one goes missing, and how to search by what was said.
category: find
answer: Screen recordings made with Shift Command 5 or QuickTime Player are saved to the Desktop by default, with names like Screen Recording 2026-11-28 at 10.12.03.mov. If yours is not there, press Shift Command 5, click Options and read the Save to line. Spotlight finds them by searching for Screen Recording.
date: 2026-11-28
updated: 2026-11-28
minutes: 5
art: a6
faq:
  - q: Where does my Mac save screen recordings?
    a: On the Desktop, unless you chose another place. Press Shift, Command and 5, click Options, and the Save to list shows the current folder with a checkmark.
  - q: Why can't I find a recording I just made?
    a: The file is written after you stop the recording, and a small thumbnail may sit in the corner for a few seconds first. If the Mac ran out of space or the recording never stopped properly, the file may not exist.
  - q: Can I search for a recording by what was said in it?
    a: Not with Finder or Spotlight. Shotlight can, on macOS 26, when macOS already has a speech model for the language. It writes a transcript on your Mac and finds the recording from any word in it.
  - q: Does Shotlight send the audio anywhere?
    a: No. The transcript is made by Apple's speech recognition on your Mac, Shotlight never downloads a speech model, and the app has no networking code.
---
A Mac screen recording is a `.mov` file named after the moment you started it, like `Screen Recording 2026-11-28 at 10.12.03.mov`. That name tells you when, and nothing about what is in it. Here is where recordings are saved, what to check when one is missing, and how to find one from what was on screen or what was said.

| Method | Finds a recording by | Works best when |
|---|---|---|
| The Save to setting | Its folder | You just made it |
| Finder and Spotlight | Name, type and date | You remember roughly when |
| Shotlight | Words on screen and words spoken | You remember what it showed or what someone said |

## Where screen recordings are saved

Recordings made with <kbd class="key">⇧</kbd> <kbd class="key">⌘</kbd> <kbd class="key">5</kbd> go to the **Desktop** unless you chose another place. **File**, then **New Screen Recording** in QuickTime Player opens the same toolbar, so the same setting applies.

To see or change the folder:

1. Press <kbd class="key">⇧</kbd> <kbd class="key">⌘</kbd> <kbd class="key">5</kbd>.
2. Click **Options**. The folder with a checkmark under **Save to** is where recordings go.
3. Pick another folder, or **Other Location** to choose your own.

Screenshots and recordings share this setting. The guide to [changing where screenshots are saved](/guides/change-screenshot-location-mac) has the Terminal version too.

Recordings from other apps follow those apps' own settings. Zoom, Loom, OBS and similar apps save to the folder chosen in their settings, and a recording made on an iPhone goes to the Photos app.

## Why a recording is missing

| What happened | What to do |
|---|---|
| The thumbnail was still in the corner | The file is saved when the thumbnail slides away. Wait a few seconds, or swipe it to the right |
| You clicked the thumbnail and deleted it | Look in the Trash |
| Save to points at another folder | Check **Options** as above |
| The Mac ran out of disk space, or went to sleep while recording | The file may never have been written. Free up space before long recordings |
| You recorded with another app | Check that app's settings for its save folder |

## Method 1: Finder and Spotlight

To find a recording by date:

1. Open Finder and press <kbd class="key">⌘</kbd> <kbd class="key">F</kbd>.
2. Set **Kind** to **Movie**.
3. Press <kbd class="key">⌘</kbd> <kbd class="key">2</kbd> for List view and sort by **Date Created**.
4. Select a file and press <kbd class="key">Space</kbd> to play it in Quick Look.

Spotlight is quicker if the name is unchanged. Press <kbd class="key">⌘</kbd> <kbd class="key">Space</kbd> and type `Screen Recording`. Neither finds a recording by what it shows or what was said.

## Method 2: Find a recording by what it showed or what was said, with Shotlight

[Shotlight](/what-is-shotlight) names screen recordings as well as screenshots. It reads four frames spread across the clip, so the name and the search also see the screens that came later in the clip.

On macOS 26 it can also write a transcript of the speech, on your Mac, when macOS already has a speech model for that language. Shotlight never downloads one, and **Settings**, then **Privacy** shows whether one is installed. Press <kbd class="key">⌥</kbd> <kbd class="key">Space</kbd>, type a word you remember someone saying, and the result shows when it was said, like `0:42 …the marketing budget`. The preview starts playing at that moment.

In the Library, **Recordings** lists every clip with its length. Move the pointer across a card to look through the recording without opening it. The inspector plays it in place, with the text that was on screen and the transcript, and clicking a line of the transcript plays from there.

If someone reads out a password or a code, Shotlight blanks it in the transcript and keeps that recording out of Spotlight. Shotlight is free while in early access, and the [download page](/download) has the install steps.

## What this does not cover

Shotlight finds recordings in the folders you give it, not in your Photos library or in other apps' libraries. Transcripts need macOS 26. On macOS 15 recordings are still named and searchable by the text on screen. To find screenshots the same way, see [how to find old screenshots on Mac](/guides/find-old-screenshots-mac).
