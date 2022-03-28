SELECT 
    COUNT(DISTINCT so.name) AS cancoes,
    COUNT(DISTINCT ar.name) AS artistas,
    COUNT(DISTINCT al.name) AS albuns
FROM
    SpotifyClone.song AS so,
    SpotifyClone.artist AS ar,
    SpotifyClone.album AS al;