/* eslint-disable camelcase */
import beautify from 'js-beautify'

export default function (container) {
  return beautify.html(container.outerHTML, {
    unformatted: ['code', 'pre', 'em', 'strong', 'span'],
    indent_inner_html: true,
    indent_char: ' ',
    indent_size: 2,
    sep: '\n',
  })
}
