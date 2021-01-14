$(document).ready(function() {
  let text =
    `<div class=option_and_description>
      <div>
        <textarea name="option" placeholder="What is your option for this poll?"></textarea>
        <textarea name="option_description" placeholder="(Optional) Provide a description of the option you  added."></textarea>
      </div>
        <button type="button" class="delete btn btn-primary"><i class="fas fa-times-circle"></i></button>
    </div>`;

  let $add = $('.add');
  $add.click(function() {
    $('#option_container').append(text);
    $('.delete').click(function() {
      let option = $(this).prev();
      let box = option.parent();

      box.remove();
      option.remove();
      $(this).remove();
    });
  });
});
