const t: HTMLTemplateElement | null = document.querySelector('.info-item-template');
const container: HTMLDivElement | null = document.querySelector('.content');

interface Atributes {
  [key: string]: any;
}

// общая функция для генерации компонентов
function create(name: string, attributes: Atributes, arg?: Array<HTMLElement | string>): HTMLElement {
  let el: HTMLElement = document.createElement(name);
  if (typeof attributes === 'object') {
    for (let i in attributes) {
      el.setAttribute(i, attributes[i]);

      if (i.toLowerCase() === 'class') {
        el.className = attributes[i]; // for IE compatibility
      } else if (i.toLowerCase() === 'style') {
        el.style.cssText = attributes[i]; // for IE compatibility
      }
    }
  }

  if (!arg) {
    return el;
  }

  for (let i = 0; i < arg.length; i++) {
    let val: HTMLElement | string | Text = arg[i];
    if (typeof val === 'string') {
      val = document.createTextNode(val);
    }
    el.appendChild(val);
  }
  return el;
}

// далее идут отдельный функции для создание элементов
const createDescription = (desc: string) => {
  return create('div', { class: 'info-item__description' }, [desc]);
};

const createInterline = () => {
  return create(
    'div',
    { class: 'info-item-interline-container' },
    [create('div', { class: 'info-item-interline-line' })]
  );
};

const createGraph = (src: string, srcset: string = '') => {
  const div = create(
    'div',
    { class: 'info-item__img-container' },
    [create('img', {
      class: 'info-item__img',
      sizes: '(min-width: 1140px) 336px, (min-width: 768px) 224px, 112px',
      src: src,
      srcset: srcset
    })]
  );

  return div;
};

const createImg = (src: string, srcset: string = '') => {
  const div = create(
    'div',
    { class: 'info-item__img-container' },
    [create('img', {
      class: 'info-item__img',
      sizes: '(min-width: 1140px) 336px, (min-width: 768px) 224px, 112px',
      src: src,
      srcset: srcset,
      id: 'camImage',
      'touch-action': 'none',
      draggable: 'false'
    })]
  );

  return div;
};

const createCameraControl = (zoom = '', bright = '') => {
  return create(
    'div',
    { class: 'info-item-camera-control' },
    [create(
      'span',
      { class: 'info-item-camera-control__desc' },
      ['Приближение: ',
        create('span', { class: 'info-item-camera-control-zoom', id: 'zoom' }, [zoom])]
    ),
      create(
      'span',
      { class: 'info-item-camera-control__desc' },
        ['Яркость: ',
          create('span', { class: 'info-item-camera-control-bright', id: 'brightness' }, [bright])]
    )]
  );
};

const createTempAndHum = (temperature: string | number = '', humidity: string | number = '') => {
  return create(
    'div',
    { class: 'info-item-temperature' },
    [create(
      'span',
      { class: 'info-item-temperature__desc' },
      ['Температру: ',
        create('span', { class: 'info-item-temperature-temp' }, [temperature + ' C'])]
    ),
      create(
      'span',
      { class: 'info-item-temperature__desc' },
        ['Влажность: ',
          create('span', { class: 'info-item-temperature-wet' }, [humidity + '%'])]
    )]
  );
};

const createButtons = (buttons: string[]) => {
  const div = create('div', { class: 'info-item-button-container' });

  buttons.forEach(el => {
    const newA = create('a', { class: 'info-item-button', href: '#' }, [el]);
    div.appendChild(newA);
  });

  return div;
};

const createMusicBlock = (logo: string = '', name: string, time: string, volume: string): HTMLElement => {
  const logoBlock = create(
    'div',
    { class: 'info-item-music__logo-container' },
    [create('img', { class: 'info-item-music__logo', src: logo, alt: '' })]
  );

  const infoBlock = create(
    'div',
    { class: 'info-item-music_bar' },
    [create('div', { class: 'info-item-music__title' }, [name]),
      create(
      'div',
      { class: 'info-item-music__range' },
        [create('input', {
          type: 'range',
          min: '0',
          max: '100',
          value: '23',
          class: 'info-item-music__range-slider'
        }),
          create('p', { class: 'info-item-music__time' }, [time])]
    )]
  );

  const volumeBlock = create(
    'div',
    { class: 'info-item-music__range' },
    [create('input', {
      type: 'range',
      min: '0',
      max: '100',
      value: '80',
      class: 'info-item-music__range-volume'
    }),
      create('p', { class: 'info-item-music__volume' }, [volume])]
  );

  const controlBlock = create(
    'div',
    { class: 'info-item-music__control-buttons' },
    [create(
      'div',
      { class: 'info-item-music__button info-item-music__button_prev' },
      [create('span', { class: 'info-item-icon info-item-icon__prev' })]
    ),
      create(
      'div',
      { class: 'info-item-music__button info-item-music__button_next' },
      [create('span', { class: 'info-item-icon info-item-icon__next' })]
    ),
      volumeBlock]
  );

  const div = create(
    'div',
    { class: 'info-item-music' },
    [create('div', { class: 'info-item-music__desc' }, [logoBlock, infoBlock]),
      create('div', { class: 'info-item-music__control' }, [controlBlock])]
  );

  return div;
};
// - - -

function cloneNode<T extends Node>(node: T, deep: boolean) {
  return node.cloneNode(deep) as T;
}

// Шаблонизация исходных данных
if (t && container) {
  data.events.forEach((item) => {
    const addInfo = create('div', { class: 'info-item-add-info' });
    const node = cloneNode(t, true);
    const content = node.content;
    const infoItem = content.querySelector('.info-item');

    infoItem && infoItem.classList.add(`info-item__${item.size}`);

    const infoItemTitle = content.querySelector('.info-item__title');
    infoItemTitle && (infoItemTitle.textContent = item.title);

    const infoItemIconUse = content.querySelector('.info-item-icon-use');
    infoItemIconUse && infoItemIconUse.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `./img/sprite.svg#${item.icon}`);

    const infoItemMetadataDesc = content.querySelector('.info-item-metadata__desc');
    infoItemMetadataDesc && (infoItemMetadataDesc.textContent = item.source);

    const infoItemMetadataDate = content.querySelector('.info-item-metadata__date');
    infoItemMetadataDate && (infoItemMetadataDate.textContent = item.time);

    if (item.type === 'critical') {
      const infoItemMainPart = content.querySelector('.info-item-main-part');
      const infoItemIcon = content.querySelector('.info-item-icon');
      const infoItemIconCross = content.querySelector('.info-item-icon__cross');

      infoItemMainPart && infoItemMainPart.classList.add('critical');
      infoItemIcon && infoItemIcon.classList.add('critical');
      infoItemIconCross && infoItemIconCross.classList.add('white');
    }

    if (item.data || item.description) {
      if (item.type === 'critical') {
        infoItem && infoItem.appendChild(createInterline());
      }

      infoItem && infoItem.appendChild(addInfo);
    }

    if (item.description) {
      addInfo.appendChild(createDescription(item.description));
    }

    if (item.data && item.data.temperature && item.data.humidity) {
      addInfo.appendChild(createTempAndHum(item.data.temperature, item.data.humidity));
    }

    if (item.data && item.data.type === 'graph') {
      // TODO: отрисовывать график
      addInfo.appendChild(createGraph('./img/Richdata.svg'));
    }

    if (item.data && item.data.image && item.icon === 'cam') {
      addInfo.appendChild(
        createImg(
          './img/img.png',
          './img/img@3x.png 336w, ./img/img@2x.png 224w, ./img/img.png 112w'
        )
      );

      addInfo.appendChild(createCameraControl('1 : 1.5', '100%'));
    }

    if (item.data && item.data.buttons) {
      addInfo.appendChild(createButtons(item.data.buttons));
    }

    if (item.data && item.data.track) {
      addInfo.appendChild(
        createMusicBlock(
          item.data.albumcover,
          item.data.artist + ' - ' + item.data.track.name,
          item.data.track.length,
          item.data.volume + '%'
        )
      );
    }

    container.appendChild(document.importNode(content, true));
  });

}
