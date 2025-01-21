// Utility functions to manage localStorage
const getOrders = () => JSON.parse(localStorage.getItem("orders")) || [];
const saveOrders = (orders) =>
  localStorage.setItem("orders", JSON.stringify(orders));

// Render orders to the display
const renderOrders = () => {
  const orderDisplay = document.getElementById("orderDisplay");
  const orders = getOrders();

  // Clear existing orders in the display
  orderDisplay.innerHTML = "";

  // Create order cards
  orders.forEach((order) => {
    const orderDiv = document.createElement("div");
    orderDiv.className = `order ${order.status
      .toLowerCase()
      .replace(" ", "-")}`;
    orderDiv.innerHTML = `
            <span><strong>${order.number}</strong></span>
            <span>${order.status}</span>
        `;
    orderDisplay.appendChild(orderDiv);
  });
};

// Handle form submission
document
  .getElementById("orderForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form values
    const orderNumber = document.getElementById("orderNumber").value;
    const orderStatus = document.getElementById("orderStatus").value;

    // Get existing orders
    const orders = getOrders();

    // Find the index of an existing order with the same number
    const existingOrderIndex = orders.findIndex(
      (order) => order.number === orderNumber
    );

    if (existingOrderIndex !== -1) {
      // Replace the existing order
      orders[existingOrderIndex] = { number: orderNumber, status: orderStatus };
    } else {
      // Add a new order if it doesn't exist
      orders.push({ number: orderNumber, status: orderStatus });
    }

    // Save updated orders and re-render
    saveOrders(orders);
    renderOrders();

    // Clear form inputs
    document.getElementById("orderNumber").value = "";
    document.getElementById("orderStatus").value = "";
  });

// Render orders on page load
renderOrders();
