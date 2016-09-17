---
title: 'padding: 0 auto;'
date: 2015-03-27 16:56:00 +00:00
has pen: true
---

One of the most common, if not ubiquitous, graphical idiom on the Web is the centred layout. You can see it across the whole spectrum, from personal weblogs like the one you're reading right now, to larger-scale publishing platforms, social networks, famous brands, public websites, or ... well, everywhere. It's also one of the first things you learn to do when you start writing CSS.

So let's say we have a `DIV.centred`, all it takes is to give it dimensions and there we go:

<p data-height="185" data-theme-id="0" data-slug-hash="yJbdLz" data-default-tab="css,result" data-user="regiskuckaertz" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/regiskuckaertz/pen/yJbdLz/">yJbdLz</a> by Regis Kuckaertz (<a href="http://codepen.io/regiskuckaertz">@regiskuckaertz</a>) on <a href="http://codepen.io">CodePen</a>.</p>

All the magic happens when you use the auto keyword to calculate margins: it gives left and right margins an equal value, which basically means that the element is centred horizontally with respect to the edges of its containing block.

Now what if we wanted the element's background to change arbitrarily and expand horizontally to the edges of the containing block? To keep the element's content centred, we'd have no choice but to introduce another element:

<p data-height="214" data-theme-id="0" data-slug-hash="PzmAwk" data-default-tab="css,result" data-user="regiskuckaertz" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/regiskuckaertz/pen/PzmAwk/">PzmAwk</a> by Regis Kuckaertz (<a href="http://codepen.io/regiskuckaertz">@regiskuckaertz</a>) on <a href="http://codepen.io">CodePen</a>.</p>

For many reasons, this pattern is ugly. It doesn't take an expert to see why, though, as obviously the complexity of the code literally doubles. Plus the usual kvetch against presentational markup: it makes the DOM more complex, increases maintenance costs and does not scale at all in a responsive world. "But it's one DIV," I hear you say. Sure, but a brief audit of the examples mentioned above reveals it can occur many times within the same document.

Wouldn't it be great if we could automatically pad elements horizontally, just like we can for margins? After all, what we're dealing with is the geometry of the `DIV.centred` element, in this case its padding box, definitely not the responsibility of its children. It turns out we can, now that the `calc()` function has some great support. Here it is:

<p data-height="192" data-theme-id="0" data-slug-hash="pbPXvW" data-default-tab="css,result" data-user="regiskuckaertz" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/regiskuckaertz/pen/pbPXvW/">pbPXvW</a> by Regis Kuckaertz (<a href="http://codepen.io/regiskuckaertz">@regiskuckaertz</a>) on <a href="http://codepen.io">CodePen</a>.</p>

This example is trivial because we're using percentages, but many times are dimensions expressed in other units and that's where `calc()` comes in handy: all you need to do is remove half the width of the content box from 50% of the width of the containing block.

And it also works when `max-width` is used instead of `width`, although in that case you'll have to use a media query:

<p data-height="247" data-theme-id="0" data-slug-hash="vKmqOB" data-default-tab="css,result" data-user="regiskuckaertz" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/regiskuckaertz/pen/vKmqOB/">vKmqOB</a> by Regis Kuckaertz (<a href="http://codepen.io/regiskuckaertz">@regiskuckaertz</a>) on <a href="http://codepen.io">CodePen</a>.</p>

There you go.
