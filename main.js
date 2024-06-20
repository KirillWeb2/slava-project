// При добавлении нового отзыва
// При добавлении нового отзыва// При добавлении нового отзыва
function addReview(userName, reviewContent, index) {
  var reviewContainer = document.getElementById('reviewContainer');
  var newReview = document.createElement('div');
  newReview.className = 'comment';
  var userNameElement = document.createElement('h4');
  userNameElement.textContent = userName;
  var reviewContentElement = document.createElement('p');
  reviewContentElement.textContent = reviewContent;
  var deleteButton = document.createElement('button');
  deleteButton.textContent = 'Удалить';
  deleteButton.addEventListener('click', function() {
    deleteReview(index);
  });
  newReview.appendChild(userNameElement);
  newReview.appendChild(reviewContentElement);
  newReview.appendChild(deleteButton);
  reviewContainer.appendChild(newReview);
}

function addReviewToStorage(review) {
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    loadReviewsFromStorage(); // перезагружаем отзывы после добавления нового отзыва
}

// При загрузке страницы
function loadReviewsFromStorage() {
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    var reviewContainer = document.getElementById('reviewContainer');
    reviewContainer.innerHTML = ''; // очищаем контейнер перед добавлением новых отзывов
    reviews.forEach((review, index) => {
        addReview(review.userName, review.reviewContent, index); // передаем индекс для удаления
    });
}

document.getElementById('reviewForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение отправки формы
    
    var userName = document.getElementById('userName').value;
    var reviewContent = document.getElementById('reviewContent').value;
    
    addReview(userName, reviewContent);
    addReviewToStorage({ userName, reviewContent }); // Сохраняем отзыв в локальное хранилище
});

function deleteReview(index) {
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.splice(index, 1); // удаляем отзыв с указанным индексом
    localStorage.setItem('reviews', JSON.stringify(reviews));
    loadReviewsFromStorage(); // перезагружаем отзывы после удаления
}

// При загрузке страницы
window.addEventListener('load', function() {
    loadReviewsFromStorage(); // Загружаем отзывы из локального хранилища при загрузке страницы
});