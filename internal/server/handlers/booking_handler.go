package handlers

import (
	"encoding/json"
	"net/http"
	"github.com/PIPILaPUPU/work_sait/internal/server/models"
	"github.com/PIPILaPUPU/work_sait/internal/server/service"
)

type BookingHandler struct {
	service *service.BookingService
}

func NewBookingHandler(s *service.BookingService) *BookingHandler {
	return &BookingHandler{service: s}
}

func (h *BookingHandler) CreateBooking(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req models.CreateBookingRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.GroupID == "" || req.ParticipantName == "" || req.ParticipantPhone == "" || req.ParticipantEmail == "" {
		http.Error(w, "Missing required fields", http.StatusBadRequest)
		return
	}

	booking, err := h.service.CreateBooking(&req)
	if err != nil {
		if err.Error() == "group is full" {
			http.Error(w, err.Error(), http.StatusConflict)
			return
		}
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(booking)
}
