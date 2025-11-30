import { CountryService } from './services/CountryService.js';
import { CountryView } from './views/CountryView.js';

const service = new CountryService();

async function loadFavorites() {
    const listEl = document.getElementById("favorites-list");

    const favCodes = service.getFavorites();

    if (favCodes.length === 0) {
        listEl.innerHTML = `
            <div class="empty-state">
                <p>Nenhum país foi favoritado ainda.</p>
            </div>
        `;
        return;
    }

    const allCountries = await service.loadAllCountries();
    const favCountries = allCountries.filter(c => favCodes.includes(c.code));

    listEl.innerHTML = CountryView.renderList(favCountries);
}

loadFavorites();


document.addEventListener("click", async (e) => {

    // detalhes
    if (e.target.matches("[data-details]")) {
        const code = e.target.dataset.details;

        const data = await service.getCountryByCode(code);
        const isFav = service.isFavorite(code);

        const html = CountryView.renderDetailsModal(data, isFav);
        document.body.insertAdjacentHTML("beforeend", html);
    }

    // favoritos
    if (e.target.matches("[data-fav]")) {
        const code = e.target.dataset.fav;

        const added = service.toggleFavorite(code);
        e.target.classList.toggle("favorite", added);
    }

    // fechar modal
    if (e.target.id === "modal-close" || e.target.id === "modal-overlay") {
        document.querySelector("#modal-overlay").remove();
    }

    // toggle dentro do modal
    if (e.target.id === "fav-toggle") {
        const overlay = document.querySelector("#modal-overlay");
        const code = overlay.dataset.code;

        const added = service.toggleFavorite(code);

        e.target.textContent = added
            ? "★ Remover dos favoritos"
            : "☆ Adicionar aos favoritos";
    }
});
