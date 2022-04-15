// slick slider
















// overlay
$("#body-row .collapse").collapse("hide");
$('.bars-icon').click(function (e) {
  console.log('sadhfsaidyf8wei')
  $('#sidebar-container').toggleClass("d-flex");
  $(".overlay").toggleClass("d-flex")
});

$(".overlay").click(function (e){
  $('#sidebar-container').toggleClass("d-flex");
  $(".overlay").toggleClass("d-flex")
  })

// Collapse/Expand icon
$("#collapse-icon").addClass("fa-angle-double-left");

// Collapse click
$("[data-toggle=sidebar-colapse]").click(function () {
  SidebarCollapse();
});

function SidebarCollapse() {
  $(".menu-collapsed").toggleClass("d-none");
  $(".sidebar-submenu").toggleClass("d-none");
  $(".submenu-icon").toggleClass("d-none");
  $("#sidebar-container").toggleClass(
    "sidebar-expanded sidebar-collapsed"
  );

  var SeparatorTitle = $(".sidebar-separator-title");
  if (SeparatorTitle.hasClass("d-flex")) {
    SeparatorTitle.removeClass("d-flex");
  } else {
    SeparatorTitle.addClass("d-flex");
  }

  // Collapse/Expand icon
  $("#collapse-icon").toggleClass(
    "fa-angle-double-left fa-angle-double-right"
  );

  
}
