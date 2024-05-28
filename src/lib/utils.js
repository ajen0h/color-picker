export function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }


  export const isColorDark = (color) => {
    // Convertir el color hex a RGB
    let r, g, b;
    if (color.charAt(0) === '#') {
      color = color.substring(1);
    }
    if (color.length === 3) {
      color = color.split('').map(c => c + c).join('');
    }
    r = parseInt(color.substring(0, 2), 16);
    g = parseInt(color.substring(2, 4), 16);
    b = parseInt(color.substring(4, 6), 16);
  
    // Calcular la luminosidad
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
  };