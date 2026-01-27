import './components';

const main = () => {
  document.body.append(document.createElement('sanipad-honmarupad'));
};

if (document.readyState === 'complete') {
  main();
} else {
  window.addEventListener('DOMContentLoaded', main, { once: true });
}
