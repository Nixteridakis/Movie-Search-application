 export function starFactory (rating){
 	let arr=[];
	let ratings =rating.match(/[^/10]+/gi);
	let number = Number(ratings/2);

	for (let i=1; i<6; i++){
		if (i<number){
			arr.push('fa fa-star')
		}
		else {
			if (i-0.5 <= number){
				arr.push('fa fa-star-half-full')
			}
			else{
			arr.push('fa fa-star-o')
			}
		}
	}
	return arr;	
}

export function releaseDate(date){
	let year = date.match(/\d+$/g);
	return year;
}
