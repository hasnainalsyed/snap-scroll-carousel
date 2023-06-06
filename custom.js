const gallery = document.querySelector('#paginated_gallery');
  const gallery_scroller = gallery.querySelector('.gallery_scroller');
  const gallery_item_size = gallery_scroller.querySelector('div').clientWidth;

  // For paginated scrolling, simply scroll the gallery one item in the given
  // direction and let css scroll snaping handle the specific alignment.

  // Add event listeners to the thumbnails
  const thumbnails = gallery.querySelectorAll('.thumbnail__item');
  function handleThumbnailClick(thumbnail, index) {
    thumbnail.addEventListener('click', () => {
      // Scroll to the corresponding item when a thumbnail is clicked
      const scrollPosition = index * gallery_item_size;
      gallery_scroller.scrollTo(scrollPosition, 0);
      updateSlideCount(index);

      // Add active class to the clicked thumbnail and remove it from other thumbnails
      thumbnails.forEach((thumbnail, i) => {
        if (i === index) {
          thumbnail.classList.add('active');
        } else {
          thumbnail.classList.remove('active');
        }
      });
    });
  }

  thumbnails.forEach(handleThumbnailClick);

  // Update the slide count
  function updateSlideCount(currentIndex) {
    const slideCountElement = document.querySelector('#slide_count');
    slideCountElement.textContent = `${currentIndex + 1} / ${thumbnails.length}`;
  }

  updateSlideCount(0);

  // Update the active thumbnail based on the scroll position
  function updateActiveThumbnail() {
    const scrollPosition = gallery_scroller.scrollLeft;
    const currentIndex = Math.floor(scrollPosition / gallery_item_size);

    // Remove active class from all thumbnails
    thumbnails.forEach((thumbnail) => {
      thumbnail.classList.remove('active');
    });

    // Add active class to the thumbnail of the currently visible item
    thumbnails[currentIndex].classList.add('active');

    // Scroll the thumbnails container to show the active thumbnail in view
    const thumbnailContainer = document.querySelector('.thumbnail');
    const thumbnailItemWidth = thumbnailContainer.querySelector('.thumbnail__item').offsetWidth;
    thumbnailContainer.scrollLeft = currentIndex * thumbnailItemWidth;
  }

  // Add scroll event listener to the gallery scroller
  gallery_scroller.addEventListener('scroll', updateActiveThumbnail);

  // Update the scrollToNextPage function to include thumbnail handling
  function scrollToNextPage() {
    const currentScrollLeft = gallery_scroller.scrollLeft;
    const maxScrollLeft = gallery_scroller.scrollWidth - gallery_scroller.clientWidth;
    const nextScrollLeft = currentScrollLeft + gallery_item_size;

    // Determine the index of the currently visible item
    const currentIndex = Math.floor(nextScrollLeft / gallery_item_size);

    if (nextScrollLeft >= maxScrollLeft) {
      // If the current item is the last item, reset the scroll position to the beginning
      gallery_scroller.scrollTo(0, 0);
      updateSlideCount(0);
    } else {
      // Scroll to the next page
      gallery_scroller.scrollTo(nextScrollLeft, 0);
      updateSlideCount(currentIndex);
    }

    // Remove active class from all thumbnails
    thumbnails.forEach((thumbnail) => {
      thumbnail.classList.remove('active');
    });

    // Add active class to the thumbnail of the currently visible item
    if (currentIndex === thumbnails.length) {
      thumbnails[0].classList.add('active');
    } else {
      thumbnails[currentIndex].classList.add('active');
    }
  }

  // Update the scrollToPrevPage function to include thumbnail handling
  function scrollToPrevPage() {
    const currentScrollLeft = gallery_scroller.scrollLeft;
    const prevScrollLeft = currentScrollLeft - gallery_item_size;

    // Determine the index of the currently visible item
    const currentIndex = Math.floor(prevScrollLeft / gallery_item_size);

    //! if you want to make it dubble sided
    // if (prevScrollLeft < 0) {
    //   // If the current item is the first item, scroll to the end of the gallery
    //   gallery_scroller.scrollTo(gallery_scroller.scrollWidth, 0);
    // } else {
    //   // Scroll to the previous page
    //   gallery_scroller.scrollTo(prevScrollLeft, 0);
    // }

    // Scroll to the previous page
    gallery_scroller.scrollTo(prevScrollLeft, 0);
    updateSlideCount(currentIndex);

    // Remove active class from all thumbnails
    thumbnails.forEach((thumbnail) => {
      thumbnail.classList.remove('active');
    });

    if (currentIndex === -1 || currentIndex === 0) {
      thumbnails[0].classList.add('active');
      updateSlideCount(0);
    } else {
      // Add active class to the thumbnail of the currently visible item
      thumbnails[currentIndex].classList.add('active');
    }
  }

  // Add event listeners to the next and previous buttons
  gallery.querySelector('.btn.next').addEventListener('click', () => {
    scrollToNextPage();
    handleThumbnailClick(thumbnails[Math.floor(gallery_scroller.scrollLeft / gallery_item_size)], Math.floor(gallery_scroller.scrollLeft / gallery_item_size));
  });

  gallery.querySelector('.btn.prev').addEventListener('click', () => {
    scrollToPrevPage();
    handleThumbnailClick(thumbnails[Math.floor(gallery_scroller.scrollLeft / gallery_item_size)], Math.floor(gallery_scroller.scrollLeft / gallery_item_size));
  });

  // Add event listeners to the thumbnails
  thumbnails.forEach(handleThumbnailClick);

  // Add active class to the first thumbnail initially
  thumbnails[0].classList.add('active');

  