const toastList = [].slice.call(document.querySelectorAll('.toast'));
const finalList = toastList.map(function(element){
    return new bootstrap.Toast(element);
});
finalList.forEach(element => element.show());
const popoverTrigger = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList =[...popoverTrigger].map(element => new bootstrap.Popover(element));