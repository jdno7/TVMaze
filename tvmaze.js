/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.
  const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`)
  // console.log(response.data);
  const shows = []
  for  (let el of response.data){
    console.log(el.show)
   shows.push(el.show);
  };
  return shows;
 
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
            <img src="${show.image.medium}" alt="https://tinyurl.com/tv-missing">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <button value="${show.id}">Get Episodes</button>
             <section style="display: none" id="episodes-area">
              <h2>Episodes</h2> 
              <ul id="${show.id}">
              </ul>
            </section>
           </div>
         </div>
       </div>
      `);
 
    $showsList.append($item);
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  // $("#episodes-area").css({'display': "none"})

  let shows = await searchShows(query);

  populateShows(shows);
});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes
  const response = await axios.get(`https://api.tvmaze.com/shows/${id}/episodes`)
    // console.log(response.data)
    episodes = [];
    for(let episode of response.data){
      // console.log(episode);
      const {id,name,season,number} = episode
      episodes.push({id,name,season,number})
    }
    for (let episode of episodes){
      const {name,season,number } = episode
      const newLi = document.createElement('li')
      newLi.innerText = `${name} (Season ${season}, Number ${number})`
      $(`#${id}`).append(newLi)
      }
  // TODO: return array-of-episode-info, as described in docstring above
    
    
}



function episodesUi(episodes){
    for (let episode of episodes){
    const {name,season,number } = episode
    const newLi = document.createElement('li')
    newLi.innerText = `${name} (Season ${season}, Number ${number})`
    $('#episodes-list').append(newLi)
    }
}

$('#shows-list').on('click','button', function(e){
  const show = $(this).val()
  $(this).next().css({'display': ""})
  // if ($('li')) {
  //   $('li').remove()
  // }
  getEpisodes(show);
})