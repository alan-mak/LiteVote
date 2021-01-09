$(document).ready(function(){
  let text =
    `<div class=option_and_description>
      <form method="POST">
        <textarea name="option" placeholder="What are your  options for this poll?"></textarea>
        <textarea name="optionDescription" placeholder="(Optional) Provide a description of the option you  added."></textarea>
      </form>
    </div>
    `;

  let $add = $('.add');
  $add.click(function() {
    $('#option_container').append(text);
  })
});
