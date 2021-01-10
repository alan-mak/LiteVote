$(document).ready(function (){
  let text =
    `<div class=option_and_description>
        <textarea name="option" placeholder="What are your  options for this poll?"></textarea>
        <textarea name="option_description" placeholder="(Optional) Provide a description of the option you  added."></textarea>
    </div>
    `;

  let $add = $('.add');
  $add.click(function (){
    $('#option_container').append(text);
  })
});
