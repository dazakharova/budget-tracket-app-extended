export function setupModalRoot() {
  const existingModal = document.getElementById('modal');
  if (!existingModal) {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal');
    document.body.appendChild(modalRoot);
  }
}
