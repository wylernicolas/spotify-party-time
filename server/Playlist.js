
class Playlist{
    
    constructor(){
        this.name =  'P A R T Y - T I M E';
        this._playlistId = null;
        this._tracks = [];
        this._tracksIds = [];
    }

    set id(id) {
        this._playlistId = id;
    }

    get id() { 
        return this._playlistId;
    }

    set track(data) {
        this._tracksIds.push(data.id);
        this._tracks.push(data.track);
    }

    set tracks(tracks) {
        this._tracksIds = tracks.map(track => track.id);
        this._tracks = tracks;
    }

    get tracks() {
        return this._tracks;
    }

    get tracksIds() {
        return this._tracksIds;
    }

    removeTrack(id) {
        let removedId;
        let removedSnapshot;
        
        const index = this._tracks.findIndex( (el) => {
            return el.track.id === id
        });
        removedId = this._tracks[index].track.id;
        removedSnapshot = this._tracks[index].track.snapshot;
        this._tracks.splice(index, 1);
        return {id:removedId, snapshot:removedSnapshot};
    }

    body() {
      return {id:this._playlistId, tracks:this._tracks};
    }
}

module.exports = Playlist;
