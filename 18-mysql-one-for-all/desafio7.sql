SELECT 
    ar.name AS artista,
    al.name AS album,
    COUNT(fl.artist_id) AS seguidores
FROM
    SpotifyClone.artist AS ar
        INNER JOIN
    album AS al ON ar.artist_id = al.artist_id
        INNER JOIN
    follower AS fl ON ar.artist_id = fl.artist_id
GROUP BY album , artista
ORDER BY seguidores DESC , artista , album;