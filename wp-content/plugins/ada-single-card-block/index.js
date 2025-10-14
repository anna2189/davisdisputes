(function(wp){
  const { registerBlockType } = wp.blocks;
  const { __ } = wp.i18n;
  const { InspectorControls, InnerBlocks, useBlockProps } = wp.blockEditor || wp.editor;
  const { PanelBody, TextControl, SelectControl } = wp.components;

  function widthToStyle(cardWidth, customWidth){
    const gap = 'var(--ada-card-gap)';
    const map = {
      '25%': `calc(25% - ${gap})`,
      '33.333%': `calc(33.333% - ${gap})`,
      '50%': `calc(50% - ${gap})`,
      '66.666%': `calc(66.666% - ${gap})`,
      '75%': `calc(75% - ${gap})`,
      '100%': '100%',
      'auto': ''
    };
    if (cardWidth === 'custom' && customWidth) return customWidth;
    if (cardWidth in map) return map[cardWidth];
    return '';
  }

  registerBlockType('ada/single-card', {
    edit: ({ attributes, setAttributes }) => {
      const { badge, cardWidth, customWidth } = attributes;
      const widthStyle = widthToStyle(cardWidth, customWidth);
      const blockProps = useBlockProps({
        className: 'ada-card',
        style: widthStyle ? { width: widthStyle } : {}
      });

      return wp.element.createElement(
        wp.element.Fragment, null,
        wp.element.createElement(
          InspectorControls, null,
          wp.element.createElement(
            PanelBody, { title: __('Card Options', 'ada-single-card-block') },
            wp.element.createElement(TextControl, {
              label: __('Badge (optional)', 'ada-single-card-block'),
              value: badge,
              onChange: (v) => setAttributes({ badge: v })
            }),
            wp.element.createElement(SelectControl, {
              label: __('Card width', 'ada-single-card-block'),
              value: cardWidth || 'auto',
              options: [
                { label: __('Auto (fit)', 'ada-single-card-block'), value: 'auto' },
                { label: __('25% (4 in a row)', 'ada-single-card-block'), value: '25%' },
                { label: __('33% (3 in a row)', 'ada-single-card-block'), value: '33.333%' },
                { label: __('50% (2 in a row)', 'ada-single-card-block'), value: '50%' },
                { label: __('66%', 'ada-single-card-block'), value: '66.666%' },
                { label: __('75%', 'ada-single-card-block'), value: '75%' },
                { label: __('100% (full row)', 'ada-single-card-block'), value: '100%' },
                { label: __('Custom…', 'ada-single-card-block'), value: 'custom' },
              ],
              onChange: (v) => setAttributes({ cardWidth: v })
            }),
            (cardWidth === 'custom') && wp.element.createElement(TextControl, {
              label: __('Custom width (e.g., 320px or 40%)', 'ada-single-card-block'),
              value: customWidth,
              onChange: (v) => setAttributes({ customWidth: v })
            })
          )
        ),
        wp.element.createElement('div', blockProps,
          badge ? wp.element.createElement('span', { className: 'ada-badge' }, badge) : null,
          wp.element.createElement(InnerBlocks, {
            template: [
              ['core/heading', { level: 3, placeholder: 'Card title…', content: 'Card title' }],
              ['core/paragraph', { placeholder: 'Write your paragraph…', content: 'Replace this with your paragraph.' }]
            ],
            templateLock: false
          })
        )
      );
    },
    save: ({ attributes }) => {
      const { badge, cardWidth, customWidth } = attributes;
      const widthStyle = widthToStyle(cardWidth, customWidth);
      const blockProps = wp.blockEditor.useBlockProps.save({
        className: 'ada-card',
        style: widthStyle ? { width: widthStyle } : {}
      });
      return wp.element.createElement('div', blockProps,
        badge ? wp.element.createElement('span', { className: 'ada-badge' }, badge) : null,
        wp.element.createElement(InnerBlocks.Content)
      );
    }
  });
})(window.wp);