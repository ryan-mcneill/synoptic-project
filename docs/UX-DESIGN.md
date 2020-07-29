# UX Design

One of the earliest things I completed for this project was to do a rough sketch of the UX design of the application. 

## First Draft

My first attempt at drawing something for the UX was a very rough sketch.

I started by creating the idea of a home view, that the user would land on to begin with and then have access to
everything from there. This home view also featured the controls and information for the currently playing song.

I then explored what controls could be available with the top menu expanded, deciding on being able to access a list of
artists, albums and playlists through this menu. Then selecting each of these options would lead to a list of songs from
that particular album / artist / playlist.

Finally, the bottom menu would feature the currently playing list of songs that you could scroll through. Then clicking
any of the songs would start that song playing. 

![UX Sketch](images/ux-sketch.jpg)

## Refinement

From this first sketch, there were a couple of points that stood out for me as needing refinement:
* Album art is typically a square and with the dimensions I was working with, this would crop it in such a way that you
could only see a small part of it.
* I was happy with the idea of expandable drawers to contain the menus and the playlist information, but having two was 
more complex both in terms of implementation and UX.
* I used this sketch when I was thinking about how to structure the data in regard to the database. I decided from this
that playlists would be an extra piece of work to maintain and would be more difficult to add in, in the time available.
This could be something to be added in a theoretical further iteration.
* After drawing the second screen after expanding the top menu, I realised that there would then be another step to show
the songs. Which meant you would have to drill click through three times to get to the song list, which also with the 
time in mind, was adding further work.