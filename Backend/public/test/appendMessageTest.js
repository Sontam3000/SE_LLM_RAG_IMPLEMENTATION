

/**
 * @jest-environment jsdom
 */

import { appendMessage } from '../controller/app.js';

describe('appendMessage()', () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="chatContainer"></div>`;
  });

  it('should append message from "You" with blue text', () => {
    appendMessage('You', 'Hello!');
    const container = document.getElementById('chatContainer');
    expect(container.innerHTML).toContain('color: blue');
    expect(container.innerHTML).toContain('You:');
  });

  it('should add <hr> if sender is not "You"', () => {
    appendMessage('LLM', 'got Hello!');
    
  });
});
