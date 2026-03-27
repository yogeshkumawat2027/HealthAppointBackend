module.exports = function generateSlots(start, end, duration) {
  let slots = [];

  let [sh, sm] = start.split(":").map(Number);
  let [eh, em] = end.split(":").map(Number);

  let current = sh * 60 + sm;
  let endTime = eh * 60 + em;

  while (current < endTime) {
    let h = Math.floor(current / 60);
    let m = current % 60;

    slots.push({
      time: `${h}:${m < 10 ? "0" + m : m}`
    });

    current += duration;
  }

  return slots;
};