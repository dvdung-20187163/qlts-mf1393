/**
     * Format tiền
     * Author: DVDUNG (19/09/2022)
     * @param {*} value
     */
export default function formatPrice(value) {
    try {
      let val = (value / 1).toFixed(3).replace(".", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } catch (error) {
      console.log(error);
    }
  }