import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';

import "./media-grid-list.css";


/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function MediaGridList({ pictures }) {

  return (

    <div className="root">

      <GridList cellHeight={280} spacing={30} cols={3} className="gridList" >

        {pictures.map((picture) => (
          <GridListTile key={picture.url} colSpan={2} className="title">

            <img src={picture.url} alt={picture.title} />
              <GridListTileBar style={{ backgroundColor: 'white', }}
                 title={<span className="titleClass">{picture.title}</span>}
                 titlePosition="bottom"
                  actionIcon={
                    <IconButton>
                      <span className="subtitleClass"> {picture.copyright}</span>
                    </IconButton>
                    }
               />

              <GridListTileBar
                 className="topBar"
                 title={<span className="dateClass">{picture.date}</span>}
                 titlePosition="top"
              />
          </GridListTile>
        ))}
      </GridList>

    </div>
  );
}