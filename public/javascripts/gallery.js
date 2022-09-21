

$(function() {
  $("#sortable").sortable({
    update: function(event, ui) {
      var sorted = $(this).sortable("serialize");
      var sortedIDs = $(this).sortable("toArray");
      var urls = null;
      $('#sortable img').each(function() {
        urls = $(this).attr("src");
        // console.log(urls)
      });
      var url = '/sesja-dziecieca/6294bd5e98fe0345ada2168e';
      // $.ajax({
      //   type: "POST",
      //   url: url,
      //   data: {

      //   }
      // });
      
    }
  });
  $("#sortable").disableSelection();
});



// $("#sortable").sortable({
//   stop: function(event, ui) {
//       $(this).children("li").each(function(index) {
//           $(this).attr("value", index);
//       });
//   }
// });




// const draggables = document.querySelectorAll('.draggable')
// const containers = document.querySelectorAll('.card-draggable')

// draggables.forEach(draggable => {
//   draggable.addEventListener('dragstart', () => {
//     draggable.classList.add('dragging')
//   })

//   draggable.addEventListener('dragend', () => {
//     draggable.classList.remove('dragging')
//   })
// })

// containers.forEach(container => {
//   container.addEventListener('dragover', e => {
//     e.preventDefault()
//     const afterElement = getDragAfterElement(container, e.clientY)
//     const draggable = document.querySelector('.dragging')
//     if (afterElement == null) {
//       container.appendChild(draggable)
//     } else {
//       container.insertBefore(draggable, afterElement)
//     }
//   })
// })

// function getDragAfterElement(container, y) {
//   const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

//   return draggableElements.reduce((closest, child) => {
//     const box = child.getBoundingClientRect()
//     const offset = y - box.top - box.height / 2
//     if (offset < 0 && offset > closest.offset) {
//       return { offset: offset, element: child }
//     } else {
//       return closest
//     }
//   }, { offset: Number.NEGATIVE_INFINITY }).element
// }

// $( function() {
//   $( "#sortable" ).sortable();
// } );

// $('.draggable').each(function(){
//     $(this).on('dragstart', function() {
//         $(this).addClass('dragging')
//     });
//     $(this).on('dragend', function() {
//         $(this).removeClass('dragging')
//     })
// })

// $('.card-draggable').each(container => {
//     $(this).on('dragover', function(e){
//         e.preventDefault();
//         const afterElement = getDragAfterElement(container, e.clientY)
//         const draggable = $('.dragging');
//         if (afterElement == null) {
//             container.appendChild(draggable)
//                     } else {
//                         container.insertBefore(draggable, afterElement)
//                     }
//         $(this).append(draggable)
//     })
// })



// function getDragAfterElement(container, y){
//    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

//     return draggableElements.reduce((closest, child) => {
//     const box = child.getBoundingClientect();
//     const offset = y - box.top - box.height / 2;
//     if (offset < 0 && offset > closest.offset) {
//         return {offset: offset, element: child}
//     } else {
//         return closest
//     }
//     }, {offset: Number.NEGATIVE_INFINITY}).element
// }