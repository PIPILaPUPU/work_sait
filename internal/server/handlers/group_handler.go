package handlers

import (
	"encoding/json"
	"net/http"
	"github.com/go-chi/chi/v5"
	"github.com/PIPILaPUPU/work_sait/internal/server/service"
)

type GroupHandler struct {
	service *service.GroupService
}

func NewGroupHandler(s *service.GroupService) *GroupHandler {
	return &GroupHandler{service: s}
}

func (h *GroupHandler) GetGroups(w http.ResponseWriter, r *http.Request) {
	groups, err := h.service.GetGroups()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(groups)
}

func (h *GroupHandler) GetGroupByID(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if id == "" {
		http.Error(w, "Group ID required", http.StatusBadRequest)
		return
	}

	groups, err := h.service.GetGroups()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	for _, g := range groups {
		if g.ID == id {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(g)
			return
		}
	}

	http.Error(w, "Group not found", http.StatusNotFound)
}
