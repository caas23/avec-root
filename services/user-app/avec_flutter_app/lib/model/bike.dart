import 'package:json_annotation/json_annotation.dart';
import 'status.dart';

part 'bike.g.dart';

@JsonSerializable(explicitToJson: true)
class Bike {
  final List location;
  final Status status;
  // @JsonKey(name: 'city_name')
  // final String cityName;

  const Bike({required this.location, required this.status});

  factory Bike.fromJson(Map<String, dynamic> json) => _$BikeFromJson(json);

  Map<String, dynamic> toJson() => _$BikeToJson(this);

  @override
  String toString() => 'Bike{location: $location, status: $status}';
}
