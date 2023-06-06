# snap-scroll-carousel
Snap Scroll Carousel with Thumbnails

I'm using CSS and JS for this carousel.

Used snap scroll CSS and JS to controll events on scroll and button clicks.

I hope you will enjoy.

This code sets up a paginated gallery with thumbnails and navigation buttons. Here's a breakdown of how it works:

1. The code selects the necessary elements from the HTML using querySelector and stores them in variables (`gallery`, `gallery_scroller`, `gallery_item_size`, `thumbnails`).

2. The `handleThumbnailClick` function is defined to handle the click event on each thumbnail. It scrolls the gallery to the corresponding item, adds the "active" class to the clicked thumbnail, and removes it from other thumbnails.

3. The `thumbnails` collection is looped through, and the `handleThumbnailClick` function is called for each thumbnail to attach the click event listener.

4. The `updateSlideCount` function is defined to update the slide count based on the current index. It selects the slide count element and modifies its text content.

5. The `updateSlideCount` function is called initially with the argument `0` to set the initial slide count.

6. The `scrollToNextPage` function is defined to scroll to the next page in the gallery. It calculates the next scroll position based on the current scroll position and the gallery item size. If the next scroll position exceeds the maximum scroll position, it resets the scroll position to the beginning and updates the slide count accordingly. Otherwise, it scrolls to the next page and updates the slide count.

7. The `thumbnails` collection is looped through, and the "active" class is removed from each thumbnail. If the current index is the last item, the "active" class is added to the first thumbnail; otherwise, it's added to the thumbnail of the currently visible item.

8. The `scrollToPrevPage` function is defined to scroll to the previous page in the gallery. It calculates the previous scroll position based on the current scroll position and the gallery item size. It always scrolls to the previous page and updates the slide count.

9. The `thumbnails` collection is looped through, and the "active" class is removed from each thumbnail. If the current index is -1 or 0, the "active" class is added to the first thumbnail; otherwise, it's added to the thumbnail of the currently visible item.

10. Event listeners are added to the next and previous buttons to call the `scrollToNextPage` and `scrollToPrevPage` functions, respectively. Additionally, the `handleThumbnailClick` function is called when clicking on the next or previous buttons, passing the current visible thumbnail index to keep it in sync with the gallery scrolling.

11. The `handleThumbnailClick` function is called again for each thumbnail to attach the click event listener. This ensures that the event listeners are added after any previous listeners were removed.

12. The "active" class is added to the first thumbnail initially to highlight it.

Overall, this code sets up a paginated gallery with thumbnails and handles scrolling, navigation, and active state management for the thumbnails.
