SELECT 
    ar.name AS artista, al.name AS album
FROM
    SpotifyClone.artist AS ar
        INNER JOIN
    SpotifyClone.album AS al ON al.artist_id = ar.artist_id
HAVING artista = 'Walter Phoenix';