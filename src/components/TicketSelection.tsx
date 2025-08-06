import React, { useState, useEffect } from "react";
import { getItemIcon } from "./utils";
import { Rarity } from "types/rarity";
import { useGameEngine } from "context/GameEngineContext";
import { RARITY_TO_TICKET_ID } from "types/inventory";
// Removed import for FaTicketAlt as react-icons/fa cannot be resolved in this environment.
// import { FaTicketAlt } from 'react-icons/fa'; // Importing a ticket icon

const MAX_TICKETS_TO_USE = 5;

interface TicketSelectionProps {
  selectedRarity: Rarity;
  onTicketsSelected: (amount: number) => void;
}

const TicketSelection: React.FC<TicketSelectionProps> = ({
  selectedRarity,
  onTicketsSelected,
}) => {
  const { gameEngine } = useGameEngine();
  const [ticketToUse, setTicketsToUse] = useState(0);

  const inventory = gameEngine.player.inventory;
  const ticketId = RARITY_TO_TICKET_ID[selectedRarity];
  const ticketsByRarity = inventory[ticketId] || {
    id: ticketId,
    quantity: 0,
    rarity: selectedRarity,
  };
  const disabled = ticketsByRarity.quantity < 1;

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newAmount = Number(event.target.value);
    if (newAmount >= 0 && newAmount <= MAX_TICKETS_TO_USE) {
      setTicketsToUse(newAmount);
      onTicketsSelected(newAmount); // Communicate the selected amount to the parent
    }
  };

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="ticket-multiplier"
        className="text-lg font-semibold flex items-center"
      >
        {getItemIcon(ticketId)}
        <span className="text-green-400 ml-1">{ticketsByRarity.quantity}</span>
      </label>
      <select
        id="ticket-multiplier"
        value={ticketToUse}
        onChange={handleSelectChange}
        className="bg-gray-700 border border-gray-600 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={disabled}
      >
        {/* Option for 0 tickets (no bonus) */}
        <option value={0}>0</option>
        {/* Options for 1 to maxSelectableTickets */}
        {Array.from({ length: MAX_TICKETS_TO_USE }, (_, i) => i + 1).map(
          (numTickets) => (
            <option
              key={numTickets}
              value={numTickets}
              disabled={numTickets > ticketsByRarity.quantity} // Disable if player doesn't have enough tickets
            >
              {numTickets}
            </option>
          ),
        )}
      </select>
    </div>
  );
};

export default TicketSelection;
